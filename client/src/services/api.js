import axios from "axios";
import { useStudioStore } from "../store/useStudioStore";

// Mocking API requests using local Axios instance and interceptors.
// If a backend URL is provided later, simply direct base URL to that environment.
const apiInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json"
  }
});

apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("avs_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // Authentication
  login: async (email, password) => {
    const store = useStudioStore.getState();
    try {
      const response = await apiInstance.post("/auth/login", { email, password });
      store.setSession(response.data.user, response.data.token);
      try {
        const projectsResponse = await apiInstance.get("/projects");
        store.setProjects(projectsResponse.data.projects);
        if (projectsResponse.data.projects[0]?.id) {
          const detail = await apiInstance.get(`/projects/${projectsResponse.data.projects[0].id}`);
          store.setProjectReports(projectsResponse.data.projects[0].id, detail.data.reports);
        }
      } catch {
        // Keep existing local projects if project hydration fails.
      }
      return response;
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const success = store.login(email, password);
      if (success) {
        return { data: { success: true, user: { email }, token: "mock-jwt-token" } };
      }
      throw new Error(error.response?.data?.message || "Invalid credentials. Try founder@example.com / password123");
    }
  },

  // Submit Startup Idea
  submitIdea: async (ideaData) => {
    const store = useStudioStore.getState();
    try {
      const response = await apiInstance.post("/projects", ideaData);
      store.upsertProject(response.data.project);
      return response;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    const projectId = store.addProject(ideaData);
    const updatedProjects = useStudioStore.getState().projects;
    const project = updatedProjects.find((p) => p.id === projectId);
    return { data: { success: true, project } };
  },

  // Run next workflow node
  runNextNode: async (projectId) => {
    const store = useStudioStore.getState();
    try {
      const response = await apiInstance.post(`/projects/${projectId}/run`, { mode: "manual" });
      store.upsertProject(response.data.project);
      const detail = await apiInstance.get(`/projects/${projectId}`);
      store.setProjectReports(projectId, detail.data.reports);
      return response;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
    store.runNextNode(projectId);
    const updatedProjects = useStudioStore.getState().projects;
    const project = updatedProjects.find((p) => p.id === projectId);
    return { data: { success: true, project } };
  },

  // Ask Boardroom Question
  askBoardroom: async (question) => {
    const store = useStudioStore.getState();
    await store.askBoardroom(question);
    return { data: { success: true } };
  }
};

export default apiInstance;
