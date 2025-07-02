import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
    return (
        < div id='main-wrapper' className='show'>
            <div className="sidebar">
                <div className="brand-logo">
                    <Link className="full-logo" to="index.html">
                        <img src="./assets/images/logoi.png" alt="" width={30} />
                    </Link>
                </div>
                <div className="menu active">
                    <ul className="show">
                        <li className="active">
                            <Link to="/" className="active">
                                <span>
                                    <i className="fi fi-rr-dashboard" />
                                </span>
                                <span className="nav-text">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/people">
                                <span>
                                    <i className="fi fi-rr-users" />
                                </span>
                                <span className="nav-text">People</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/loans">
                                <span>
                                    <i className="fi fi-rr-hand-holding-usd" />
                                </span>
                                <span className="nav-text">Loans</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/wallets">
                                <span>
                                    <i className="fi fi-rr-wallet" />
                                </span>
                                <span className="nav-text">Wallets</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/budgets">
                                <span>
                                    <i className="fi fi-rr-donate" />
                                </span>
                                <span className="nav-text">Budgets</span>
                            </Link>
                        </li>
                      
                        <li>
                            <Link to="/profiles">
                                <span>
                                    <i className="fi fi-rr-user" />
                                </span>
                                <span className="nav-text">Profile</span>
                            </Link>
                        </li>
                        
                       
                        <li>
                            <Link to="/settings">
                                <span>
                                    <i className="fi fi-rs-settings" />
                                </span>
                                <span className="nav-text">Settings</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default SideBar
