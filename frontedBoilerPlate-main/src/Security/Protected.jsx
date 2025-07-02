import React from 'react'
import { Navigate } from "react-router-dom"
import { useAuth } from '../Utils/useAuth'

function Protected({children}) {
    const { isAuthenticated } = useAuth()

    return isAuthenticated ? children : <Navigate to='/login'/>
}

export default Protected