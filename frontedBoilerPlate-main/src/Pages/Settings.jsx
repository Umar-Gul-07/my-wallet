import React, { useState } from 'react'
import { userAPI } from '../Utils/apiService.js'

const Settings = () => {
    const [backupLoading, setBackupLoading] = useState(false)
    const [backupMessage, setBackupMessage] = useState('')

    const handleCreateBackup = async () => {
        setBackupLoading(true)
        setBackupMessage('')
        
        try {
            const response = await userAPI.createBackup()
            if (response.success) {
                setBackupMessage('✅ Backup created successfully! Your data is now safe.')
            } else {
                setBackupMessage('❌ Backup failed: ' + response.message)
            }
        } catch (error) {
            setBackupMessage('❌ Backup failed: ' + (error.response?.data?.message || error.message))
        } finally {
            setBackupLoading(false)
        }
    }
    return (
        < >
            <div className="content-body" style={{ minHeight: 1782 }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title">
                                <div className="row align-items-center justify-content-between">
                                    <div className="col-xl-4">
                                        <div className="page-title-content">
                                            <h3>Settings</h3>
                                            <p className="mb-2">Welcome Ekash Finance Management</p>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <div className="breadcrumbs">
                                            <a href="#">Home </a>
                                            <span>
                                                <i className="fi fi-rr-angle-small-right" />
                                            </span>
                                            <a href="#">Settings</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row active">
                        <div className="col-xxl-12 col-xl-12 show">
                            <div className="settings-menu active">
                                <a href="./settings.html" className="active">
                                    Account
                                </a>
                                <a href="./settings-general.html">General</a>
                                <a href="./settings-profile.html">Profile</a>
                               
                                <a href="./support.html">Support</a>
                            </div>
                            <div className="row">
                                <div className="col-xxl-6 col-xl-6 col-lg-6">
                                    <div className="card ">
                                        <div className="card-body">
                                            <div className="welcome-profile">
                                                <div className="d-flex align-items-center">
                                                    <img src="./images/avatar/3.jpg" alt="" />
                                                    <div className="ms-3">
                                                        <h4>Welcome, Hafsa Humaira!</h4>
                                                        <p>
                                                            Looks like you are not verified yet. Verify yourself to
                                                            use the full potential of Ekash.
                                                        </p>
                                                    </div>
                                                </div>
                                                <ul>
                                                    <li>
                                                        <a href="#">
                                                            <span className="verified">
                                                                <i className="fi fi-bs-check" />
                                                            </span>
                                                            Verify account
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <span className="not-verified">
                                                                <i className="fi fi-rs-shield-check" />
                                                            </span>
                                                            Two-factor authentication (2FA)
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-6 col-xl-6 col-lg-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">Download App</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="app-link">
                                                <h5>Get Verified On Our Mobile App</h5>
                                                <p>
                                                    Verifying your identity on our mobile app more secure,
                                                    faster, and reliable.
                                                </p>
                                                <a href="#" className="btn btn-primary">
                                                    <img src="./images/android.svg" alt="" />
                                                </a>
                                                <br />
                                                <div className="mt-3" />
                                                <a href="#" className="btn btn-primary">
                                                    <img src="./images/apple.svg" alt="" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-8 col-xl-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">VERIFY &amp; UPGRADE </h4>
                                        </div>
                                        <div className="card-body">
                                            <h5>
                                                Account Status :<span className="text-warning"> Pending</span>
                                            </h5>
                                            <p>
                                                Your account is unverified. Get verified to enable funding,
                                                trading, and withdrawal.
                                            </p>
                                            <a href="#" className="btn btn-primary">
                                                Get Verified
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-4 col-xl-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">
                                                <i className="fi fi-rr-shield-check me-2"></i>
                                                Data Backup
                                            </h4>
                                        </div>
                                        <div className="card-body">
                                            <p>
                                                Your financial data is precious. Create a backup to protect against data loss.
                                            </p>
                                            {backupMessage && (
                                                <div className={`alert ${backupMessage.includes('✅') ? 'alert-success' : 'alert-danger'} mb-3`}>
                                                    {backupMessage}
                                                </div>
                                            )}
                                            <button 
                                                className="btn btn-primary"
                                                onClick={handleCreateBackup}
                                                disabled={backupLoading}
                                            >
                                                {backupLoading ? (
                                                    <>
                                                        <i className="fi fi-rr-loading me-2"></i>
                                                        Creating Backup...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="fi fi-rr-download me-2"></i>
                                                        Create Backup Now
                                                    </>
                                                )}
                                            </button>
                                            <div className="mt-2">
                                                <small className="text-muted">
                                                    <i className="fi fi-rr-info me-1"></i>
                                                    Auto-backup runs every 24 hours
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-12">
                                    <div className="card">
                                        <div className="card-header flex-row">
                                            <h4 className="card-title">Information </h4>
                                            <a className="btn btn-primary" href="/settings-profile.html">
                                                Edit
                                            </a>
                                        </div>
                                        <div className="card-body">
                                            <form className="row">
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                                                    <div className="user-info">
                                                        <span>USER ID</span>
                                                        <h4>818778</h4>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                                                    <div className="user-info">
                                                        <span>EMAIL ADDRESS</span>
                                                        <h4>email@example.com</h4>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                                                    <div className="user-info">
                                                        <span>COUNTRY OF RESIDENCE</span>
                                                        <h4>Bangladesh</h4>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                                                    <div className="user-info">
                                                        <span>JOINED SINCE</span>
                                                        <h4>20/10/2020</h4>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                                                    <div className="user-info">
                                                        <span>TYPE</span>
                                                        <h4>Personal</h4>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Settings
