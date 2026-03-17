import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

// Custom hook — call this in any component to get auth state
const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used inside <AuthProvider>')
  }
  return context
}

export default useAuth
