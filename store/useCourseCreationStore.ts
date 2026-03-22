import { create } from 'zustand';

export type ContentItemType = 'video' | 'document';

export interface ContentItem {
  id: string;
  type: ContentItemType;
  title: string;
  fileUri?: string;
  fileName?: string;
  fileSize?: number;
}

export interface CourseSection {
  id: string;
  title: string;
  order: number;
  content: ContentItem[];
}

export interface AssessmentSettings {
  isPreAssessmentEnabled: boolean;
  isFinalExamEnabled: boolean;
  title: string;
  passingScore: number;
  retakes: number;
  timeLimit: number; // in minutes
  isRandomized: boolean;
}

export interface CourseData {
  title: string;
  description: string;
  sections: CourseSection[];
  assessment: AssessmentSettings;
}

interface CourseCreationState {
  step: number;
  courseData: CourseData;
  setStep: (step: number) => void;
  setCourseMetadata: (title: string, description: string) => void;
  addSection: () => void;
  deleteSection: (id: string) => void;
  updateSectionTitle: (id: string, newTitle: string) => void;
  reorderSections: (newSections: CourseSection[]) => void;
  addContentToSection: (sectionId: string, item: Omit<ContentItem, 'id'>) => void;
  deleteContentFromSection: (sectionId: string, contentId: string) => void;
  updateAssessmentSettings: (settings: Partial<AssessmentSettings>) => void;
  resetStore: () => void;
}

const initialCourseData: CourseData = {
  title: '',
  description: '',
  sections: [
    { id: '1', title: 'Introduction to SEO', order: 0, content: [] },
    { id: '2', title: 'Keyword Research Mastery', order: 1, content: [] },
    { id: '3', title: 'On-Page Optimization', order: 2, content: [] },
  ],
  assessment: {
    isPreAssessmentEnabled: false,
    isFinalExamEnabled: true,
    title: 'Final Mastery Certification',
    passingScore: 80,
    retakes: 3,
    timeLimit: 60,
    isRandomized: false,
  },
};

export const useCourseCreationStore = create<CourseCreationState>((set) => ({
  step: 1,
  courseData: { ...initialCourseData },

  setStep: (step) => set({ step }),

  setCourseMetadata: (title, description) =>
    set((state) => ({
      courseData: { ...state.courseData, title, description },
    })),

  addSection: () =>
    set((state) => {
      const newSection: CourseSection = {
        id: Date.now().toString(),
        title: 'New Section',
        order: state.courseData.sections.length,
        content: [],
      };
      return {
        courseData: {
          ...state.courseData,
          sections: [...state.courseData.sections, newSection],
        },
      };
    }),

  deleteSection: (id) =>
    set((state) => ({
      courseData: {
        ...state.courseData,
        sections: state.courseData.sections.filter((s) => s.id !== id),
      },
    })),

  updateSectionTitle: (id, newTitle) =>
    set((state) => ({
      courseData: {
        ...state.courseData,
        sections: state.courseData.sections.map((s) =>
          s.id === id ? { ...s, title: newTitle } : s
        ),
      },
    })),

  reorderSections: (newSections) =>
    set((state) => ({
      courseData: { ...state.courseData, sections: newSections },
    })),

  addContentToSection: (sectionId, item) =>
    set((state) => {
      const newItem: ContentItem = { ...item, id: Date.now().toString() };
      return {
        courseData: {
          ...state.courseData,
          sections: state.courseData.sections.map((s) =>
            s.id === sectionId ? { ...s, content: [...s.content, newItem] } : s
          ),
        },
      };
    }),

  deleteContentFromSection: (sectionId, contentId) =>
    set((state) => ({
      courseData: {
        ...state.courseData,
        sections: state.courseData.sections.map((s) =>
          s.id === sectionId
            ? { ...s, content: s.content.filter((c) => c.id !== contentId) }
            : s
        ),
      },
    })),

  updateAssessmentSettings: (settings) =>
    set((state) => ({
      courseData: {
        ...state.courseData,
        assessment: { ...state.courseData.assessment, ...settings },
      },
    })),

  resetStore: () => set({ step: 1, courseData: { ...initialCourseData } }),
}));
