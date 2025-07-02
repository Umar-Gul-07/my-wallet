import React from 'react'

const Profile = () => {
    return (
        <>
            <div className="content-body" style={{ minHeight: 1782 }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title">
                                <div className="row align-items-center justify-content-between">
                                    <div className="col-xl-4">
                                        <div className="page-title-content">
                                            <h3>Profile</h3>
                                            <p className="mb-2">Welcome Ekash Finance Management</p>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <div className="breadcrumbs">
                                            <a href="#">Home </a>
                                            <span>
                                                <i className="fi fi-rr-angle-small-right" />
                                            </span>
                                            <a href="#">Profile</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="profile-name">
                                        <div className="d-flex">
                                            <img src="./images/avatar/1.jpg" alt="" />
                                            <div className="flex-grow-1">
                                                <h4 className="mb-0">Henry John Paulin</h4>
                                                <p>henry@gmail.com</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile-reg">
                                        <div className="registered">
                                            <h5>25 June 2024</h5>
                                            <p>Registered</p>
                                        </div>
                                        <span className="reg_divider" />
                                        <div className="rank">
                                            <h5>Referral</h5>
                                            <p>05</p>
                                        </div>
                                    </div>
                                    <div className="profile-wallet-nav">
                                        <ul className="nav nav-tabs">
                                            <li>
                                                <a data-bs-toggle="tab" href="#city-bank" className="active">
                                                    <span className="icons usd">
                                                        <i className="fi fi-rr-bank" />
                                                    </span>
                                                    City Bank
                                                    <span>
                                                        <i className="fi fi-bs-angle-right" />
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a data-bs-toggle="tab" href="#debit-card">
                                                    <span className="icons gift">
                                                        <i className="fi fi-rr-credit-card" />
                                                    </span>
                                                    Debit Card
                                                    <span>
                                                        <i className="fi fi-bs-angle-right" />
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a data-bs-toggle="tab" href="#visa-card">
                                                    <span className="icons cart">
                                                        <i className="fi fi-brands-visa" />
                                                    </span>
                                                    Visa Card
                                                    <span>
                                                        <i className="fi fi-bs-angle-right" />
                                                    </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a data-bs-toggle="tab" href="#cash">
                                                    <span className="icons link">
                                                        <i className="fi fi-rr-money-bill-wave-alt" />
                                                    </span>
                                                    Cash
                                                    <span>
                                                        <i className="fi fi-bs-angle-right" />
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="tab-content profile-wallet-tab">
                                <div className="tab-pane fade show active" id="city-bank">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="wallet-progress-data">
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        <span>Spend</span>
                                                        <h3>$1458.30</h3>
                                                    </div>
                                                    <div className="text-end">
                                                        <span>Budget</span>
                                                        <h3>$1458.30</h3>
                                                    </div>
                                                </div>
                                                <div className="progress">
                                                    <div
                                                        className="progress-bar"
                                                        style={{ width: "25%" }}
                                                        role="progressbar"
                                                    ></div>
                                                </div>
                                                <div className="d-flex justify-content-between mt-2">
                                                    <span>25%</span>
                                                    <span>75%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">City Bank</h4>
                                            <div id="area-chart-action" className="nav d-block">
                                                <span className="active" data-bs-toggle="tab">
                                                    Day
                                                </span>
                                                <span data-bs-toggle="tab">Week</span>
                                                <span data-bs-toggle="tab">Month</span>
                                                <span data-bs-toggle="tab">Year</span>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="chartjs-size-monitor">
                                                <div className="chartjs-size-monitor-expand">
                                                    <div className="" />
                                                </div>
                                                <div className="chartjs-size-monitor-shrink">
                                                    <div className="" />
                                                </div>
                                            </div>
                                            <canvas
                                                id="profileWallet"
                                                width={1620}
                                                height={490}
                                                style={{ display: "block", height: 245, width: 810 }}
                                                className="chartjs-render-monitor"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="debit-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="wallet-progress-data">
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        <span>Spend</span>
                                                        <h3>$1458.30</h3>
                                                    </div>
                                                    <div className="text-end">
                                                        <span>Budget</span>
                                                        <h3>$1458.30</h3>
                                                    </div>
                                                </div>
                                                <div className="progress">
                                                    <div
                                                        className="progress-bar"
                                                        style={{ width: "25%" }}
                                                        role="progressbar"
                                                    ></div>
                                                </div>
                                                <div className="d-flex justify-content-between mt-2">
                                                    <span>25%</span>
                                                    <span>75%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">Debit Card</h4>
                                            <div id="area-chart-action2" className="nav d-block">
                                                <span className="active" data-bs-toggle="tab">
                                                    Day
                                                </span>
                                                <span data-bs-toggle="tab">Week</span>
                                                <span data-bs-toggle="tab">Month</span>
                                                <span data-bs-toggle="tab">Year</span>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <canvas
                                                id="profileWallet2"
                                                height={0}
                                                width={0}
                                                className="chartjs-render-monitor"
                                                style={{ display: "block", height: 0, width: 0 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="visa-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="wallet-progress-data">
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        <span>Spend</span>
                                                        <h3>$1458.30</h3>
                                                    </div>
                                                    <div className="text-end">
                                                        <span>Budget</span>
                                                        <h3>$1458.30</h3>
                                                    </div>
                                                </div>
                                                <div className="progress">
                                                    <div
                                                        className="progress-bar"
                                                        style={{ width: "25%" }}
                                                        role="progressbar"
                                                    ></div>
                                                </div>
                                                <div className="d-flex justify-content-between mt-2">
                                                    <span>25%</span>
                                                    <span>75%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">Visa Card</h4>
                                            <div id="area-chart-action3" className="nav d-block">
                                                <span className="active" data-bs-toggle="tab">
                                                    Day
                                                </span>
                                                <span data-bs-toggle="tab">Week</span>
                                                <span data-bs-toggle="tab">Month</span>
                                                <span data-bs-toggle="tab">Year</span>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <canvas
                                                id="profileWallet3"
                                                height={0}
                                                width={0}
                                                className="chartjs-render-monitor"
                                                style={{ display: "block", height: 0, width: 0 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="cash">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="wallet-progress-data">
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        <span>Spend</span>
                                                        <h3>$1458.30</h3>
                                                    </div>
                                                    <div className="text-end">
                                                        <span>Budget</span>
                                                        <h3>$1458.30</h3>
                                                    </div>
                                                </div>
                                                <div className="progress">
                                                    <div
                                                        className="progress-bar"
                                                        style={{ width: "25%" }}
                                                        role="progressbar"
                                                    ></div>
                                                </div>
                                                <div className="d-flex justify-content-between mt-2">
                                                    <span>25%</span>
                                                    <span>75%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">Cash</h4>
                                            <div id="area-chart-action4" className="nav d-block">
                                                <span className="active" data-bs-toggle="tab">
                                                    Day
                                                </span>
                                                <span data-bs-toggle="tab">Week</span>
                                                <span data-bs-toggle="tab">Month</span>
                                                <span data-bs-toggle="tab">Year</span>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <canvas
                                                id="profileWallet4"
                                                height={0}
                                                width={0}
                                                className="chartjs-render-monitor"
                                                style={{ display: "block", height: 0, width: 0 }}
                                            />
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

export default Profile