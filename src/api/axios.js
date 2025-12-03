import axios from "axios";

const api = axios.create({
    baseURL: "https://skillboard-backend-a3ruozlmc-danieltayal07s-projects.vercel.app",
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("skillboard-user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;
