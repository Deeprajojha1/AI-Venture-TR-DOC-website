import axios from "axios";
import { useStudioStore } from "../store/useStudioStore";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

const isUnauthorized = (error) => error.response?.status === 401;

const hydrateProjects = async () => {
  const store = useStudioStore.getState();
  const projectsResponse = await apiInstance.get("/projects");
  store.setProjects(projectsResponse.data.projects);

  if (projectsResponse.data.projects[0]?.id) {
    const detail = await apiInstance.get(`/projects/${projectsResponse.data.projects[0].id}`);
    store.setProjectReports(projectsResponse.data.projects[0].id, detail.data.reports);
  }
};

apiInstance.interceptors.response.use(undefined, (error) => {
  if (isUnauthorized(error)) {
    useStudioStore.getState().logout();
  }
  return Promise.reject(error);
});

export const api = {
  login: async (email, password) => {
    try {
      const response = await apiInstance.post("/auth/login", { email, password });
      useStudioStore.getState().setSession(response.data.user);

      try {
        await hydrateProjects();
      } catch {
        // Keep the authenticated session even if project hydration fails.
      }

      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Invalid credentials");
    }
  },

  register: async (name, email, password) => {
    try {
      const response = await apiInstance.post("/auth/register", { name, email, password });
      useStudioStore.getState().setSession(response.data.user);

      try {
        await hydrateProjects();
      } catch {
        // New accounts may not have projects yet.
      }

      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Unable to create account");
    }
  },

  checkSession: async () => {
    const store = useStudioStore.getState();
    store.setAuthLoading(true);

    try {
      const response = await apiInstance.get("/auth/me");
      store.setSession(response.data.user);

      try {
        await hydrateProjects();
      } catch {
        // Auth is valid even if workspace data cannot hydrate.
      }

      return response.data.user;
    } catch {
      store.logout();
      return null;
    } finally {
      store.setAuthLoading(false);
    }
  },

  logout: async () => {
    try {
      await apiInstance.post("/auth/logout");
    } finally {
      useStudioStore.getState().logout();
    }
  },

  submitIdea: async (ideaData) => {
    const store = useStudioStore.getState();
    try {
      const response = await apiInstance.post("/projects", ideaData);
      store.upsertProject(response.data.project);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Unable to create project");
    }
  },

  runNextNode: async (projectId) => {
    const store = useStudioStore.getState();
    try {
      const response = await apiInstance.post(`/projects/${projectId}/run`, { mode: "manual" });
      store.upsertProject(response.data.project);
      const detail = await apiInstance.get(`/projects/${projectId}`);
      store.setProjectReports(projectId, detail.data.reports);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Unable to run workflow");
    }
  },

  regenerateAgent: async (projectId, agentKey) => {
    const store = useStudioStore.getState();
    try {
      const response = await apiInstance.post(`/projects/${projectId}/agents/${agentKey}/regenerate`);
      store.upsertProject(response.data.project);
      const detail = await apiInstance.get(`/projects/${projectId}`);
      store.setProjectReports(projectId, detail.data.reports);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Unable to regenerate agent");
    }
  },

  emailProject: async (projectId) => {
    try {
      return await apiInstance.post(`/projects/${projectId}/email`);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Unable to email project");
    }
  },

  getAnalytics: async () => {
    const response = await apiInstance.get("/analytics");
    return response.data;
  },

  askBoardroom: async (question) => {
    const store = useStudioStore.getState();
    await store.askBoardroom(question);
    return { data: { success: true } };
  }
};

export default apiInstance;
