import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store } from './Store'

export const useAuth = () => {
  const { state, dispatch } = useContext(Store)
  const navigate = useNavigate()
  const { UserInfo } = state

  const login = (userData) => {
    localStorage.setItem('UserInfo', JSON.stringify(userData))
    dispatch({ type: 'LawyerLogin', payload: userData })
  }

  const logout = () => {
    localStorage.removeItem('UserInfo')
    dispatch({ type: 'LawyerLogout' })
    navigate('/login')
  }

  const checkAuth = () => {
    return UserInfo !== null
  }

  const requireAuth = () => {
    if (!checkAuth()) {
      navigate('/login')
      return false
    }
    return true
  }

  return {
    UserInfo,
    login,
    logout,
    checkAuth,
    requireAuth,
    isAuthenticated: checkAuth()
  }
} 