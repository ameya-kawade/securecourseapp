import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';

// Create a custom storage for Zustand persist middleware using expo-secure-store
const zustandStorage: StateStorage = {
  setItem: async (name, value) => {
    await SecureStore.setItemAsync(name, value);
  },
  getItem: async (name) => {
    const value = await SecureStore.getItemAsync(name);
    return value ?? null;
  },
  removeItem: async (name) => {
    await SecureStore.deleteItemAsync(name);
  },
};

export interface SessionData {
  clientName: string;
  trainingSite: string;
  courseModule: string;
  startDate: Date | null;
  startTime: Date | null;
  selectedTraineeIds: string[];
}

interface SessionCreationState {
  step: number;
  sessionData: SessionData;
  setStep: (step: number) => void;
  setSessionBasics: (basics: Partial<Omit<SessionData, 'selectedTraineeIds'>>) => void;
  toggleTraineeSelection: (traineeId: string) => void;
  selectAllTrainees: (traineeIds: string[]) => void;
  clearTraineeSelection: () => void;
  resetStore: () => void;
}

const initialSessionData: SessionData = {
  clientName: '',
  trainingSite: '',
  courseModule: '',
  startDate: null,
  startTime: null,
  selectedTraineeIds: [],
};

export const useSessionCreationStore = create<SessionCreationState>()(
  persist(
    (set) => ({
      step: 1,
      sessionData: { ...initialSessionData },

      setStep: (step) => set({ step }),

      setSessionBasics: (basics) =>
        set((state) => ({
          sessionData: { ...state.sessionData, ...basics },
        })),

      toggleTraineeSelection: (traineeId) =>
        set((state) => {
          const isSelected = state.sessionData.selectedTraineeIds.includes(traineeId);
          const newSelection = isSelected
            ? state.sessionData.selectedTraineeIds.filter((id) => id !== traineeId)
            : [...state.sessionData.selectedTraineeIds, traineeId];

          return {
            sessionData: { ...state.sessionData, selectedTraineeIds: newSelection },
          };
        }),

      selectAllTrainees: (traineeIds) =>
        set((state) => ({
          sessionData: { ...state.sessionData, selectedTraineeIds: traineeIds },
        })),

      clearTraineeSelection: () =>
        set((state) => ({
          sessionData: { ...state.sessionData, selectedTraineeIds: [] },
        })),

      resetStore: () => set({ step: 1, sessionData: { ...initialSessionData } }),
    }),
    {
      name: 'session-creation-storage',
      storage: createJSONStorage(() => zustandStorage),
      // We don't want to persist the current step, only the form data, so if they completely
      // exit the wizard, maybe they start at step 1 next time but the data is there.
      // Actually, persisting the step is fine too so they resume exactly where they left off.
    }
  )
);
