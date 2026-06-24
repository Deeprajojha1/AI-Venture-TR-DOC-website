import { create } from "zustand";
import { INITIAL_PROJECTS, INITIAL_DISCUSSION, SIMULATED_RESPONSES, WORKFLOW_NODES_LIST } from "../data/dummyData";

export const useStudioStore = create((set, get) => ({
  // Auth State
  user: JSON.parse(localStorage.getItem("avs_user") || "null") || { email: "founder@example.com" },
  token: localStorage.getItem("avs_token"),
  isAuthenticated: Boolean(localStorage.getItem("avs_token")) || true,

  // UI State
  activeTab: "dashboard", // dashboard, studio, boardroom, analytics

  // Projects State
  projects: INITIAL_PROJECTS,
  selectedProjectId: "proj-1",
  reportsByProject: {},

  // Boardroom State
  discussion: INITIAL_DISCUSSION,
  isBoardroomTyping: false,
  consensusScore: 82,

  // Studio Running State
  isAutoRunning: false,
  runningIntervalId: null,

  // Auth Actions
  setSession: (user, token) => {
    localStorage.setItem("avs_user", JSON.stringify(user));
    localStorage.setItem("avs_token", token);
    set({ user, token, isAuthenticated: true, activeTab: "dashboard" });
  },
  login: (email, password) => {
    if (email === "founder@example.com" && password === "password123") {
      set({ user: { email }, isAuthenticated: true, activeTab: "dashboard" });
      return true;
    }
    return false;
  },
  logout: () => {
    localStorage.removeItem("avs_user");
    localStorage.removeItem("avs_token");
    set({ user: null, isAuthenticated: false });
  },

  // Tab Navigation
  setTab: (tab) => set({ activeTab: tab }),

  // Project Selection & Management
  selectProject: (id) => set({ selectedProjectId: id }),
  
  addProject: (newProjectData) => {
    const newId = `proj-${Date.now()}`;
    const newProject = {
      id: newId,
      name: newProjectData.name,
      industry: newProjectData.industry,
      targetUsers: newProjectData.targetUsers,
      country: newProjectData.country,
      budget: newProjectData.budget,
      timeline: newProjectData.timeline,
      idea: newProjectData.idea,
      status: "Draft",
      score: 60 + Math.floor(Math.random() * 25), // Random initial score
      lastUpdated: "Just now",
      currentNodeIndex: 0,
      completedNodes: [],
      healthMetrics: {
        marketPotential: 50 + Math.floor(Math.random() * 45),
        technicalFeasibility: 50 + Math.floor(Math.random() * 45),
        financialViability: 50 + Math.floor(Math.random() * 45),
        executionReadiness: 50 + Math.floor(Math.random() * 45),
        competitiveness: 50 + Math.floor(Math.random() * 45),
        scalability: 50 + Math.floor(Math.random() * 45)
      }
    };
    set((state) => ({
      projects: [newProject, ...state.projects],
      selectedProjectId: newId
    }));
    return newId;
  },

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

  // Studio Workflow Runner Actions
  runNextNode: (projectId) => {
    set((state) => {
      const projects = state.projects.map((proj) => {
        if (proj.id === projectId) {
          const nextIndex = proj.currentNodeIndex;
          if (nextIndex >= WORKFLOW_NODES_LIST.length) {
            return { ...proj, status: "Completed" };
          }
          const updatedCompleted = proj.completedNodes.includes(nextIndex)
            ? proj.completedNodes
            : [...proj.completedNodes, nextIndex];
          
          const isDone = nextIndex === WORKFLOW_NODES_LIST.length - 1;
          
          return {
            ...proj,
            currentNodeIndex: isDone ? nextIndex : nextIndex + 1,
            completedNodes: updatedCompleted,
            status: isDone ? "Completed" : "Active",
            lastUpdated: "Just now",
            score: Math.min(100, proj.score + Math.floor(Math.random() * 3) + 1)
          };
        }
        return proj;
      });
      return { projects };
    });
  },

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

    const token = get().token || localStorage.getItem("avs_token");
    if (token) {
      try {
        const response = await fetch("/api/boardroom/debate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
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
        // Fall back to local simulated responses below.
      }
    }

    // Find if the query matches database keywords
    const lowerQ = questionText.toLowerCase();
    let responseKey = "default";
    if (lowerQ.includes("price") || lowerQ.includes("pricing") || lowerQ.includes("charge") || lowerQ.includes("cost")) {
      responseKey = "pricing";
    } else if (lowerQ.includes("db") || lowerQ.includes("database") || lowerQ.includes("tech") || lowerQ.includes("sql") || lowerQ.includes("storage")) {
      responseKey = "database";
    } else if (lowerQ.includes("fund") || lowerQ.includes("money") || lowerQ.includes("capital") || lowerQ.includes("seed") || lowerQ.includes("raise")) {
      responseKey = "funding";
    }

    const executiveResponses = SIMULATED_RESPONSES[responseKey];

    // Simulate staggered replies from CEO, CTO, CMO, CFO
    let delay = 1200;
    const roles = ["ceo", "cto", "cmo", "cfo"];

    roles.forEach((role, idx) => {
      setTimeout(() => {
        const text = executiveResponses[role];
        const reply = {
          senderId: role,
          text: text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        set((state) => {
          const isLast = idx === roles.length - 1;
          return {
            discussion: [...state.discussion, reply],
            isBoardroomTyping: !isLast,
            consensusScore: Math.min(100, Math.max(50, state.consensusScore + (Math.random() > 0.4 ? 2 : -2)))
          };
        });
      }, delay);
      delay += 1800; // 1.8 seconds between each executive
    });
  },

  resetBoardroom: () => {
    set({
      discussion: INITIAL_DISCUSSION,
      isBoardroomTyping: false,
      consensusScore: 82
    });
  }
}));
