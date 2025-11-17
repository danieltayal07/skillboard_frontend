import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const userData = await authAPI.getCurrentUser()
          setUser(userData)
        } catch (error) {
          // Token is invalid, clear it
          localStorage.removeItem('token')
          setToken(null)
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [token])

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password)
      const { token: newToken, user: userData } = response
      
      localStorage.setItem('token', newToken)
      setToken(newToken)
      setUser(userData)
      
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please try again.'
      }
    }
  }

  const signup = async (email, password, name) => {
    try {
      await authAPI.signup(email, password, name)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Signup failed. Please try again.'
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

