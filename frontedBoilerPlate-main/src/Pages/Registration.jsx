import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userAPI } from '../Utils/apiService.js'

const Registration = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        // Clear error when user starts typing
        if (error) setError('')
    }

    const validateForm = () => {
        if (!formData.name.trim()) {
            setError('Full name is required')
            return false
        }
        if (!formData.email.trim()) {
            setError('Email is required')
            return false
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Please enter a valid email address')
            return false
        }
        if (!formData.password) {
            setError('Password is required')
            return false
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long')
            return false
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!validateForm()) return

        setLoading(true)
        setError('')
        setSuccess('')

        try {
            const adminData = {
                name: formData.name.trim(),
                email: formData.email.trim().toLowerCase(),
                password: formData.password
            }

            const response = await userAPI.createAdmin(adminData)
            
            if (response.success) {
                setSuccess('Admin registration successful! You can now login.')
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                })
                
                // Redirect to login after 2 seconds
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            } else {
                setError(response.message || 'Registration failed')
            }
        } catch (err) {
            // No console logs in browser; show friendly message in UI instead
            setError(err.response?.data?.message || 'Registration failed. Please try again.')
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
                                            <p className="text-muted">Admin Setup - Personal Wallet Management</p>
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
                                        <h4>Admin Registration</h4>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-12 mb-3">
                                                    <label className="form-label">Admin Name *</label>
                                                    <input
                                                        name="name"
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter admin name"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-12 mb-3">
                                                    <label className="form-label">Admin Email *</label>
                                                    <input 
                                                        name="email" 
                                                        type="email" 
                                                        className="form-control" 
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter admin email"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-12 mb-3">
                                                    <label className="form-label">Password *</label>
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
                                                <div className="col-12 mb-3">
                                                    <label className="form-label">Confirm Password *</label>
                                                    <input
                                                        name="confirmPassword"
                                                        type="password"
                                                        className="form-control"
                                                        value={formData.confirmPassword}
                                                        onChange={handleInputChange}
                                                        placeholder="Confirm your password"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            
                                            {error && (
                                                <div className="alert alert-danger" role="alert">
                                                    {error}
                                                </div>
                                            )}
                                            
                                            {success && (
                                                <div className="alert alert-success" role="alert">
                                                    {success}
                                                </div>
                                            )}
                                            
                                            <div className="mt-3 d-grid gap-2">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary me-8 text-white"
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Creating Account...' : 'Sign Up'}
                                                </button>
                                            </div>
                                        </form>
                                        <p className="mt-3 mb-0 undefined">
                                            Already have an account?
                                            <a className="text-primary" href="/login">
                                                {" "}
                                                Sign In
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

export default Registration
