import React from 'react'
import { Navigate } from "react-router-dom"
import { useAuth } from '../Utils/useAuth'

const Protected = ({ children }) => {
    const { isAuthenticated } = useAuth()
    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }
    return children
}

export default Protected