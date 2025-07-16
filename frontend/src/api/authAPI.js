import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://planpilot-to1k.onrender.com";

//^ Axios Instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//^ Login
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/api/login", credentials);

    //^ Storing token in localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("username", response.data.user.username);
    }

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Network error during login"
    );
  }
};

//^ Register
export const registerUser = async (userData) => {
  try {
    console.log(userData);
    const response = await api.post("/api/signup", userData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Network error during registration"
    );
  }
};

//^ Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.setItem("isAuthenticated", false);
};

//^ Get stored token
export const getToken = () => {
  return localStorage.getItem("token");
};

//^ Authentication Check
export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

//^ UserName initials
export const getUser = () => {
  return localStorage.getItem("username");
};
