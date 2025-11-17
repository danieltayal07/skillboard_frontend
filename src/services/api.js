import axios from 'axios'

// Use proxy in development (Vite proxies /api to backend), direct URL in production
// In dev: requests to /api/* are proxied to http://localhost:3000/api/*
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? '' : 'https://skillboard-backend.vercel.app')

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle 401 errors (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  signup: async (email, password, name) => {
    const response = await api.post('/api/auth/signup', {
      email,
      password,
      name,
    })
    return response.data
  },

  login: async (email, password) => {
    const response = await api.post('/api/auth/login', {
      email,
      password,
    })
    return response.data
  },

  getCurrentUser: async () => {
    const response = await api.get('/api/auth/me')
    return response.data.user
  },

  logout: async () => {
    const response = await api.post('/api/auth/logout')
    return response.data
  },
}

export default api

