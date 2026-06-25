import { create } from "zustand";

export const useStudioStore = create((set, get) => ({
  // Auth State
  user: null,
  isAuthenticated: false,
  isAuthLoading: true,

  // UI State
  activeTab: "dashboard", // dashboard, studio, boardroom, analytics

  // Projects State
  projects: [],
  selectedProjectId: null,
  reportsByProject: {},

  // Boardroom State
  discussion: [],
  isBoardroomTyping: false,
  consensusScore: 0,

  // Studio Running State
  isAutoRunning: false,
  runningIntervalId: null,

  // Auth Actions
  setSession: (user) => {
    set({ user, isAuthenticated: true, activeTab: "dashboard" });
  },
  setAuthLoading: (isAuthLoading) => set({ isAuthLoading }),
  logout: () => {
    set({ user: null, isAuthenticated: false, isAuthLoading: false });
  },

  // Tab Navigation
  setTab: (tab) => set({ activeTab: tab }),

  // Project Selection & Management
  selectProject: (id) => set({ selectedProjectId: id }),
  
  upsertProject: (project) => {
    set((state) => {
      const exists = state.projects.some((item) => item.id === project.id);
      return {
        projects: exists
          ? state.projects.map((item) => (item.id === project.id ? project : item))
          : [project, ...state.projects],
        selectedProjectId: project.id
      };
    });
  },

  setProjects: (projects) => set((state) => ({
    projects,
    selectedProjectId: state.selectedProjectId && projects.some((project) => project.id === state.selectedProjectId)
      ? state.selectedProjectId
      : projects[0]?.id || null
  })),

  setProjectReports: (projectId, reports) => set((state) => ({
    reportsByProject: {
      ...state.reportsByProject,
      [projectId]: reports
    }
  })),

  setAutoRunning: (isRunning) => set({ isAutoRunning: isRunning }),

  // Boardroom Discussions Actions
  askBoardroom: async (questionText) => {
    if (!questionText.trim()) return;

    // Add user question
    const userMsg = {
      senderId: "user",
      text: questionText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    set((state) => ({
      discussion: [...state.discussion, userMsg],
      isBoardroomTyping: true
    }));

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || "/api"}/boardroom/debate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ question: questionText, projectId: get().selectedProjectId })
      });
      if (response.ok) {
        const data = await response.json();
        set((state) => ({
          discussion: [...state.discussion, ...data.roleMessages],
          consensusScore: data.consensus,
          isBoardroomTyping: false
        }));
        return;
      }
    } catch {
      // Keep the user message in the thread; API errors are surfaced by the page state.
    }

    set({ isBoardroomTyping: false });
  },

  resetBoardroom: () => {
    set({
      discussion: [],
      isBoardroomTyping: false,
      consensusScore: 0
    });
  }
}));
