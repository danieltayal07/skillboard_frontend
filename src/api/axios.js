import axios from "axios";

const api = axios.create({
    baseURL: "https://skillboard-backend.onrender.com",
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("skillboard-user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;
