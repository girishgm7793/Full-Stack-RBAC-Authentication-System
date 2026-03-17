import React, { createContext, useState } from 'react'
import type { AuthUser } from '../types/auth.types'

// Shape of what the context provides
interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (userData: AuthUser) => void
  logout: () => void
}

// Create the context with undefined as default (checked in useAuth)
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface Props {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: Props) => {

  // Initialize from localStorage so login persists on page refresh
  const [user, setUser] = useState<AuthUser | null>(() => {
    const token = localStorage.getItem('token')
    const role  = localStorage.getItem('role')
    const name  = localStorage.getItem('name')
    const email = localStorage.getItem('email')
    if (token && role && name && email) {
      return { token, role, name, email }
    }
    return null
  })

  // Called after successful login — saves data to state and localStorage
  const login = (userData: AuthUser) => {
    localStorage.setItem('token', userData.token)
    localStorage.setItem('role',  userData.role)
    localStorage.setItem('name',  userData.name)
    localStorage.setItem('email', userData.email)
    setUser(userData)
  }

  // Called on logout — removes all data from state and localStorage
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
