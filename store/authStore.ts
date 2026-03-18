import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

interface User {
  id: string;
  fullName: string;
  email: string;
  employeeId: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Actions
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,

  setLoading: (isLoading) => set({ isLoading }),

  login: async (token, user) => {
    try {
      await SecureStore.setItemAsync('userToken', token);
      set({ token, user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.error('Failed to save token:', error);
    }
  },

  logout: async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      set({ token: null, user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const token = await SecureStore.getItemAsync('userToken');
      // In a real app, you might validate the token with an API call here.
      // For now, we'll assume a present token means authenticated.
      if (token) {
        // Mock user details since we aren't fetching them yet.
        const mockUser: User = {
          id: '1',
          fullName: 'Alex Johnson',
          email: 'alex.johnson@enterprise.com',
          employeeId: 'EMP-12345'
        };
        set({ token, user: mockUser, isAuthenticated: true, isLoading: false });
      } else {
        set({ token: null, user: null, isAuthenticated: false, isLoading: false });
      }
    } catch (error) {
      console.error('Failed to check auth:', error);
      set({ token: null, user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
