import axios from "axios";
import authService from "./auth.service";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json"
  }
});

// Add request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 (Unauthorized) and not already retrying
    if (error.response.status === 401 && !originalRequest._retry) {
      // Log out the user as token is invalid
      authService.logout();
      window.location.href = "/login";
    }
    
    return Promise.reject(error);
  }
);

// Project API calls
const projectService = {
  getAllProjects: () => {
    return api.get("/projects");
  },
  
  getUserProjects: () => {
    return api.get("/projects/user");
  },
  
  getProjectById: (id) => {
    return api.get(`/projects/${id}`);
  },
  
  createProject: (projectData) => {
    return api.post("/projects", projectData);
  },
  
  updateProject: (id, projectData) => {
    return api.put(`/projects/${id}`, projectData);
  },
  
  deleteProject: (id) => {
    return api.delete(`/projects/${id}`);
  },
  
  addMemberToProject: (projectId, userId) => {
    return api.post(`/projects/${projectId}/members/${userId}`);
  },
  
  removeMemberFromProject: (projectId, userId) => {
    return api.delete(`/projects/${projectId}/members/${userId}`);
  }
};

// Task API calls
const taskService = {
  getAllTasks: () => {
    return api.get("/tasks");
  },
  
  getTasksByProject: (projectId) => {
    return api.get(`/tasks/project/${projectId}`);
  },
  
  getAssignedTasks: () => {
    return api.get("/tasks/assigned");
  },
  
  getTaskById: (id) => {
    return api.get(`/tasks/${id}`);
  },
  
  createTask: (taskData) => {
    return api.post("/tasks", taskData);
  },
  
  updateTask: (id, taskData) => {
    return api.put(`/tasks/${id}`, taskData);
  },
  
  deleteTask: (id) => {
    return api.delete(`/tasks/${id}`);
  },
  
  updateTaskStatus: (id, status) => {
    return api.patch(`/tasks/${id}/status?status=${status}`);
  },
  
  updateTaskProgress: (id, progress) => {
    return api.patch(`/tasks/${id}/progress?progress=${progress}`);
  },
  
  assignTask: (id, userId) => {
    return api.patch(`/tasks/${id}/assign/${userId}`);
  }
};

// User API calls
const userService = {
  getAllUsers: () => {
    return api.get("/users");
  },
  
  getUserById: (id) => {
    return api.get(`/users/${id}`);
  },
  
  getCurrentUser: () => {
    return api.get("/users/me");
  }
};

export { projectService, taskService, userService };
