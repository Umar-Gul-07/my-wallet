import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store } from './Store'

export const useAuth = () => {
  const { state, dispatch } = useContext(Store)
  const navigate = useNavigate()
  const { Admin } = state

  const login = (adminData) => {
    localStorage.setItem('Admin', JSON.stringify(adminData))
    dispatch({ type: 'Admin', payload: adminData })
  }

  const logout = () => {
    localStorage.removeItem('Admin')
    dispatch({ type: 'AdminLogout' })
    navigate('/login')
  }

  const checkAuth = () => {
    // Check if user is logged in (either admin or regular user)
    return Admin !== null
  }

  const requireAuth = () => {
    if (!checkAuth()) {
      navigate('/login')
      return false
    }
    return true
  }

  return {
    Admin,
    login,
    logout,
    checkAuth,
    requireAuth,
    isAuthenticated: checkAuth()
  }
} 