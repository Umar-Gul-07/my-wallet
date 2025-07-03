import React from 'react'
import { useAuth } from '../../Utils/useAuth'
import { useTheme } from '../../Utils/useTheme'

function Header() {
  const { UserInfo, logout } = useAuth()
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="header-content">
                <div className="header-left">
                  <div className="brand-logo">
                    <a className="mini-logo" href="index.html">
                      <img src="./images/logoi.png" alt="" width={40} />
                    </a>
                  </div>
                  <div className="search">
                    <form action="#">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Here"
                        />
                        <span className="input-group-text">
                          <i className="fi fi-br-search" />
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="header-right">
                  <div className="dark-light-toggle" onClick={toggleTheme} style={{ cursor: 'pointer' }}>
                    <span className={isDarkMode ? 'light' : 'dark'}>
                      <i className="fi fi-rr-eclipse-alt" />
                    </span>
                    <span className={isDarkMode ? 'dark' : 'light'}>
                      <i className="fi fi-rr-eclipse-alt" />
                    </span>
                  </div>
                  <div className="nav-item dropdown notification">
                    <div data-bs-toggle="dropdown">
                      <div className="notify-bell icon-menu">
                        <span>
                          <i className="fi fi-rs-bells" />
                        </span>
                      </div>
                    </div>
                    <div
                      tabIndex={-1}
                      role="menu"
                      aria-hidden="true"
                      className="dropdown-menu dropdown-menu-end"
                    >
                      <h4>Recent Notification</h4>
                      <div className="lists">
                        <a className="" href="/#">
                          <div className="d-flex align-items-center">
                            <span className="me-3 icon success">
                              <i className="fi fi-bs-check" />
                            </span>
                            <div>
                              <p>Account created successfully</p>
                              <span>2024-11-04 12:00:23</span>
                            </div>
                          </div>
                        </a>
                        <a className="" href="/#">
                          <div className="d-flex align-items-center">
                            <span className="me-3 icon fail">
                              <i className="fi fi-sr-cross-small" />
                            </span>
                            <div>
                              <p>2FA verification failed</p>
                              <span>2024-11-04 12:00:23</span>
                            </div>
                          </div>
                        </a>
                        <a className="" href="/#">
                          <div className="d-flex align-items-center">
                            <span className="me-3 icon success">
                              <i className="fi fi-bs-check" />
                            </span>
                            <div>
                              <p>Device confirmation completed</p>
                              <span>2024-11-04 12:00:23</span>
                            </div>
                          </div>
                        </a>
                        <a className="" href="/#">
                          <div className="d-flex align-items-center">
                            <span className="me-3 icon pending">
                              <i className="fi fi-rr-triangle-warning" />
                            </span>
                            <div>
                              <p>Phone verification pending</p>
                              <span>2024-11-04 12:00:23</span>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="more">
                        <a href="/notifications.html">
                          More
                          <i className="fi fi-bs-angle-right" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown profile_log dropdown">
                    <div data-bs-toggle="dropdown">
                      <div className="user icon-menu active">
                        <span>
                          <i className="fi fi-rr-user" />
                        </span>
                      </div>
                    </div>
                    <div
                      tabIndex={-1}
                      role="menu"
                      aria-hidden="true"
                      className="dropdown-menu dropdown-menu dropdown-menu-end"
                    >
                      <div className="user-email">
                        <div className="user">
                          <span className="thumb">
                            <img
                              className="rounded-full"
                              src="./images/avatar/3.jpg"
                              alt=""
                            />
                          </span>
                          <div className="user-info">
                            <h5>{UserInfo ? UserInfo.name : 'User'}</h5>
                            <span>{UserInfo ? UserInfo.email : ''}</span>
                          </div>
                        </div>
                      </div>
                      <a className="dropdown-item" href="/profiles">
                        <span>
                          <i className="fi fi-rr-user" />
                        </span>
                        Profile
                      </a>
                      <a className="dropdown-item" href="/wallets">
                        <span>
                          <i className="fi fi-rr-wallet" />
                        </span>
                        Wallets
                      </a>
                      <a className="dropdown-item" href="/settings">
                        <span>
                          <i className="fi fi-rr-settings" />
                        </span>
                        Settings
                      </a>
                      <a className="dropdown-item logout" onClick={logout} style={{ cursor: 'pointer' }}>
                        <span>
                          <i className="fi fi-bs-sign-out-alt" />
                        </span>
                        Logout
                      </a>
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

export default Header