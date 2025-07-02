import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Utils/useAuth'
import { userAPI } from '../Utils/apiService.js'

const Login = () => {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        if (error) setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await userAPI.login(formData)
            
            if (response.success) {
                const userData = {
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    isAdmin: false,
                    role: 'user',
                    ...response.data
                }
                login(userData)
                navigate('/')
            } else {
                setError(response.message || 'Login failed')
            }
        } catch (err) {
            console.error('Login error:', err)
            setError(err.response?.data?.message || 'Login failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="authincation">
                <div className="container">
                    <div className="row justify-content-center align-items-center g-0">
                        <div className="col-xl-8">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <div className="welcome-content">
                                        <div className="welcome-title">
                                            <div className="mini-logo">
                                                <a href="/">
                                                    <img src="images/logo-white.png" alt="" width={30} />
                                                </a>
                                            </div>
                                            <h3>Welcome to KakaWallet</h3>
                                        </div>
                                        <div className="privacy-social">
                                            <div className="privacy-link">
                                                <a href="#">Have an issue with 2-factor authentication?</a>
                                                <br />
                                                <a href="#">Privacy Policy</a>
                                            </div>
                                            <div className="intro-social">
                                                <ul>
                                                    <li>
                                                        <a href="#">
                                                            <i className="fi fi-brands-facebook" />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i className="fi fi-brands-twitter-alt" />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i className="fi fi-brands-linkedin" />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i className="fi fi-brands-pinterest" />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="auth-form">
                                        <h4>Sign In</h4>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-12 mb-3">
                                                    <label className="form-label">Email</label>
                                                    <input 
                                                        name="email" 
                                                        type="email" 
                                                        className="form-control"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter your email"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-12 mb-3">
                                                    <label className="form-label">Password</label>
                                                    <input
                                                        name="password"
                                                        type="password"
                                                        className="form-control"
                                                        value={formData.password}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter your password"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-check">
                                                        <input
                                                            name="rememberMe"
                                                            id="rememberMe"
                                                            type="checkbox"
                                                            className="form-check-input"
                                                        />
                                                        <label className="form-check-label" htmlFor="rememberMe">
                                                            Remember me
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-6 text-end">
                                                    <a href="/reset-password">Forgot Password?</a>
                                                </div>
                                            </div>
                                            
                                            {error && (
                                                <div className="alert alert-danger" role="alert">
                                                    {error}
                                                </div>
                                            )}
                                            
                                            <div className="mt-3 d-grid gap-2">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary me-8 text-white"
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Signing In...' : 'Sign In'}
                                                </button>
                                            </div>
                                        </form>
                                        
                                        <p className="mt-3 mb-0 undefined">
                                            Do not have an account?
                                            <a className="text-primary" href="/sign-up">
                                                {" "}
                                                Sign up
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
