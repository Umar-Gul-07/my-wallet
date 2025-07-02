import React from 'react'

const Budgets = () => {
    return (
        <>
            <div className="content-body" style={{ minHeight: 1063 }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title">
                                <div className="row align-items-center justify-content-between">
                                    <div className="col-xl-4">
                                        <div className="page-title-content">
                                            <h3>Budgets</h3>
                                            <p className="mb-2">Welcome Ekash Finance Management</p>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <div className="breadcrumbs">
                                            <a href="#">Home </a>
                                            <span>
                                                <i className="fi fi-rr-angle-small-right" />
                                            </span>
                                            <a href="#">Budgets</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="budgets-tab">
                        <div className="row g-0">
                            <div className="col-xl-3">
                                <div className="nav d-block" role="tablist">
                                    <div className="row">
                                        <div className="col-xl-12 col-md-6">
                                            <div
                                                className="budgets-nav active"
                                                data-bs-toggle="pill"
                                                data-bs-target="#a1"
                                                aria-selected="true"
                                                role="tab"
                                            >
                                                <div className="budgets-nav-icon">
                                                    <span>
                                                        <i className="fi fi-rr-carrot" />
                                                    </span>
                                                </div>
                                                <div className="budgets-nav-text">
                                                    <h3>Grocery</h3>
                                                    <p>$1458.30</p>
                                                </div>
                                                <span className="show-time">Overtime</span>
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-md-6">
                                            <div
                                                className="budgets-nav"
                                                data-bs-toggle="pill"
                                                data-bs-target="#a2"
                                                aria-selected="false"
                                                tabIndex={-1}
                                                role="tab"
                                            >
                                                <div className="budgets-nav-icon">
                                                    <span>
                                                        <i className="fi fi-rr-shirt-long-sleeve" />
                                                    </span>
                                                </div>
                                                <div className="budgets-nav-text">
                                                    <h3>Cloths</h3>
                                                    <p>$1458.30</p>
                                                </div>
                                                <span className="show-time">Week</span>
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-md-6">
                                            <div
                                                className="budgets-nav"
                                                data-bs-toggle="pill"
                                                data-bs-target="#a3"
                                                aria-selected="false"
                                                tabIndex={-1}
                                                role="tab"
                                            >
                                                <div className="budgets-nav-icon">
                                                    <span>
                                                        <i className="fi fi-rr-car-bus" />
                                                    </span>
                                                </div>
                                                <div className="budgets-nav-text">
                                                    <h3>Transportation</h3>
                                                    <p>$1458.30</p>
                                                </div>
                                                <span className="show-time">Month</span>
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-md-6">
                                            <div
                                                className="budgets-nav"
                                                data-bs-toggle="pill"
                                                data-bs-target="#a4"
                                                aria-selected="false"
                                                tabIndex={-1}
                                                role="tab"
                                            >
                                                <div className="budgets-nav-icon">
                                                    <span>
                                                        <i className="fi fi-rr-graduation-cap" />
                                                    </span>
                                                </div>
                                                <div className="budgets-nav-text">
                                                    <h3>Education</h3>
                                                    <p>$1458.30</p>
                                                </div>
                                                <span className="show-time">Day</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="add-budgets-link">
                                    <h5 className="mb-0">Add new budget</h5>
                                    <a href="add-new-account.html">
                                        <i className="fi fi-rr-square-plus" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-xl-9">
                                <div className="tab-content budgets-tab-content">
                                    <div className="tab-pane show active" id="a1" role="tabpanel">
                                        <div className="budgets-tab-title">
                                            <h3>Grocery</h3>
                                        </div>
                                        <div className="row">
                                            <div className="col-xl-12">
                                                <div className="card">
                                                    <div className="card-body">
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
                                            <div className="col-xxl-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                                                <div className="budget-widget">
                                                                    <p>Last Month</p>
                                                                    <h3>$42,678</h3>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                                                <div className="budget-widget">
                                                                    <p>Expenses</p>
                                                                    <h3>$1,798</h3>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                                                <div className="budget-widget">
                                                                    <p>Taxes</p>
                                                                    <h3>$255.25</h3>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                                                <div className="budget-widget">
                                                                    <p>Debt</p>
                                                                    <h3>$365,478</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-12">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h4 className="card-title">Budget Period </h4>
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
                                                            id="chartjsBudgetPeriod"
                                                            height={490}
                                                            style={{ display: "block", height: 245, width: 763 }}
                                                            width={1526}
                                                            className="chartjs-render-monitor"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="a2" role="tabpanel">
                                        <div className="budgets-tab-title">
                                            <h3>Cloths</h3>
                                        </div>
                                        <div className="row">
                                            <div className="col-xl-12">
                                                <div className="card">
                                                    <div className="card-body">
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
                                            <div className="col-xxl-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                                                <div className="budget-widget">
                                                                    <p>Last Month</p>
                                                                    <h3>$42,678</h3>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                                                <div className="budget-widget">
                                                                    <p>Expenses</p>
                                                                    <h3>$1,798</h3>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                                                <div className="budget-widget">
                                                                    <p>Taxes</p>
                                                                    <h3>$255.25</h3>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                                                <div className="budget-widget">
                                                                    <p>Debt</p>
                                                                    <h3>$365,478</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-12">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h4 className="card-title">Budget Period </h4>
                                                    </div>
                                                    <div className="card-body">
                                                        <canvas
                                                            id="chartjsBudgetPeriod2"
                                                            height={0}
                                                            style={{ display: "block", height: 0, width: 0 }}
                                                            width={0}
                                                            className="chartjs-render-monitor"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="a3" role="tabpanel">
                                        <div className="budgets-tab-title">
                                            <h3>Transportation</h3>
                                        </div>
                                        <div className="row">
                                            <div className="col-xl-12">
                                                <div className="card">
                                                    <div className="card-body">
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
                                            <div className="col-xxl-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                                                <div className="budget-widget">
                                                                    <p>Last Month</p>
                                                                    <h3>$42,678</h3>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                                                <div className="budget-widget">
                                                                    <p>Expenses</p>
                                                                    <h3>$1,798</h3>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                                                <div className="budget-widget">
                                                                    <p>Taxes</p>
                                                                    <h3>$255.25</h3>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                                                <div className="budget-widget">
                                                                    <p>Debt</p>
                                                                    <h3>$365,478</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-12">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h4 className="card-title">Budget Period </h4>
                                                    </div>
                                                    <div className="card-body">
                                                        <canvas
                                                            id="chartjsBudgetPeriod3"
                                                            height={0}
                                                            style={{ display: "block", height: 0, width: 0 }}
                                                            width={0}
                                                            className="chartjs-render-monitor"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="a4" role="tabpanel">
                                        <div className="budgets-tab-title">
                                            <h3>Education</h3>
                                        </div>
                                        <div className="row">
                                            <div className="col-xl-12">
                                                <div className="card">
                                                    <div className="card-body">
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
                                            <div className="col-xxl-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                                                <div className="budget-widget">
                                                                    <p>Last Month</p>
                                                                    <h3>$42,678</h3>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                                                <div className="budget-widget">
                                                                    <p>Expenses</p>
                                                                    <h3>$1,798</h3>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                                                <div className="budget-widget">
                                                                    <p>Taxes</p>
                                                                    <h3>$255.25</h3>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                                                <div className="budget-widget">
                                                                    <p>Debt</p>
                                                                    <h3>$365,478</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-12">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h4 className="card-title">Budget Period </h4>
                                                    </div>
                                                    <div className="card-body">
                                                        <canvas
                                                            id="chartjsBudgetPeriod4"
                                                            height={0}
                                                            style={{ display: "block", height: 0, width: 0 }}
                                                            width={0}
                                                            className="chartjs-render-monitor"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
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

export default Budgets
