import axios from "axios";
import { getToken } from "./authAPI.js";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

//^ Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//^ Interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//^ Get all tasks
export const getTasks = async () => {
  try {
    const response = await api.get("/api/tasks");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Network error while fetching tasks"
    );
  }
};

//^ Create a Task
export const createTask = async (taskData) => {
  try {
    const response = await api.post("/api/tasks", taskData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Network error while creating task"
    );
  }
};

//^ Update a task
export const updateTask = async (taskId, taskData) => {
  try {
    console.log("update function", taskData);
    const response = await api.put(`/api/task/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Network error while updating task"
    );
  }
};

//^ Delete a task
export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/api/task/${taskId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Network error while deleting task"
    );
  }
};
