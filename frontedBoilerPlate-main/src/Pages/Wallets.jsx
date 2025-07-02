import React from 'react'

const Wallets = () => {
    return (
        <>
            <div className="content-body" style={{ minHeight: 1003 }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title">
                                <div className="row align-items-center justify-content-between">
                                    <div className="col-xl-4">
                                        <div className="page-title-content">
                                            <h3>Wallets</h3>
                                            <p className="mb-2">Welcome Ekash Finance Management</p>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <div className="breadcrumbs">
                                            <a href="#">Home </a>
                                            <span>
                                                <i className="fi fi-rr-angle-small-right" />
                                            </span>
                                            <a href="#">Wallets</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wallet-tab">
                        <div className="row g-0">
                            <div className="col-xl-3">
                                <div className="nav d-block" role="tablist">
                                    <div className="row">
                                        <div className="col-xl-12 col-md-6">
                                            <div
                                                className="wallet-nav active"
                                                data-bs-toggle="pill"
                                                data-bs-target="#a1"
                                                aria-selected="true"
                                                role="tab"
                                            >
                                                <div className="wallet-nav-icon">
                                                    <span>
                                                        <i className="fi fi-rr-bank" />
                                                    </span>
                                                </div>
                                                <div className="wallet-nav-text">
                                                    <h3>City Bank</h3>
                                                    <p>$221,478</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-md-6">
                                            <div
                                                className="wallet-nav"
                                                data-bs-toggle="pill"
                                                data-bs-target="#a2"
                                                aria-selected="false"
                                                tabIndex={-1}
                                                role="tab"
                                            >
                                                <div className="wallet-nav-icon">
                                                    <span>
                                                        <i className="fi fi-rr-credit-card" />
                                                    </span>
                                                </div>
                                                <div className="wallet-nav-text">
                                                    <h3>Debit Card</h3>
                                                    <p>$221,478</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-md-6">
                                            <div
                                                className="wallet-nav"
                                                data-bs-toggle="pill"
                                                data-bs-target="#a3"
                                                aria-selected="false"
                                                tabIndex={-1}
                                                role="tab"
                                            >
                                                <div className="wallet-nav-icon">
                                                    <span>
                                                        <i className="fi fi-brands-visa" />
                                                    </span>
                                                </div>
                                                <div className="wallet-nav-text">
                                                    <h3>Visa Card</h3>
                                                    <p>$221,478</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-md-6">
                                            <div
                                                className="wallet-nav"
                                                data-bs-toggle="pill"
                                                data-bs-target="#a4"
                                                aria-selected="false"
                                                tabIndex={-1}
                                                role="tab"
                                            >
                                                <div className="wallet-nav-icon">
                                                    <span>
                                                        <i className="fi fi-rr-money-bill-wave-alt" />
                                                    </span>
                                                </div>
                                                <div className="wallet-nav-text">
                                                    <h3>Cash</h3>
                                                    <p>$221,478</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="add-card-link">
                                    <h5 className="mb-0">Add new wallet</h5>
                                    <a href="add-new-account.html">
                                        <i className="fi fi-rr-square-plus" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-xl-9">
                                <div className="tab-content wallet-tab-content">
                                    <div className="tab-pane show active" id="a1" role="tabpanel">
                                        <div className="wallet-tab-title">
                                            <h3>City Bank</h3>
                                        </div>
                                        <div className="row">
                                            <div className="col-xxl-6 col-xl-6 col-lg-6">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="wallet-total-balance">
                                                            <p className="mb-0">Total Balance</p>
                                                            <h2>$221,478</h2>
                                                        </div>
                                                        <div className="funds-credit">
                                                            <p className="mb-0">Personal Funds</p>
                                                            <h5>$32,500.28</h5>
                                                        </div>
                                                        <div className="funds-credit">
                                                            <p className="mb-0">Credit Limits</p>
                                                            <h5>$2500.00</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xxl-6 col-xl-6 col-lg-6">
                                                <div className="credit-card visa">
                                                    <div className="type-brand">
                                                        <h4>Debit Card</h4>
                                                        <img src="./images/cc/visa.png" alt="" />
                                                    </div>
                                                    <div className="cc-number">
                                                        <h6>1234</h6>
                                                        <h6>5678</h6>
                                                        <h6>7890</h6>
                                                        <h6>9875</h6>
                                                    </div>
                                                    <div className="cc-holder-exp">
                                                        <h5>Saiful Islam</h5>
                                                        <div className="exp">
                                                            <span>EXP:</span>
                                                            <strong>12/21</strong>
                                                        </div>
                                                    </div>
                                                    <div className="cc-info">
                                                        <div className="row justify-content-between align-items-center">
                                                            <div className="col-5">
                                                                <div className="d-flex">
                                                                    <p className="me-3">Status</p>
                                                                    <p>
                                                                        <strong>Active</strong>
                                                                    </p>
                                                                </div>
                                                                <div className="d-flex">
                                                                    <p className="me-3">Currency</p>
                                                                    <p>
                                                                        <strong>USD</strong>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-7">
                                                                <div className="d-flex justify-content-between">
                                                                    <div className="ms-3">
                                                                        <p>Credit Limit</p>
                                                                        <p>
                                                                            <strong>2000 USD</strong>
                                                                        </p>
                                                                    </div>
                                                                    <div id="circle3" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                <div className="stat-widget-1">
                                                    <h6>Total Balance</h6>
                                                    <h3>$ 432568</h3>
                                                    <p>
                                                        <span className="text-success">
                                                            <i className="fi fi-rr-arrow-trend-up" />
                                                            2.47%
                                                        </span>
                                                        Last month <strong>$24,478</strong>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                <div className="stat-widget-1">
                                                    <h6>Monthly Expenses</h6>
                                                    <h3>$ 432568</h3>
                                                    <p>
                                                        <span className="text-success">
                                                            <i className="fi fi-rr-arrow-trend-up" />
                                                            2.47%
                                                        </span>
                                                        Last month <strong>$24,478</strong>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-xxl-12">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h4 className="card-title">Balance Overtime</h4>
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
                                                        <div className="chartjs-size-monitor">
                                                            <div className="chartjs-size-monitor-expand">
                                                                <div className="" />
                                                            </div>
                                                            <div className="chartjs-size-monitor-shrink">
                                                                <div className="" />
                                                            </div>
                                                        </div>
                                                        <canvas
                                                            id="chartjsBalanceOvertime"
                                                            height={490}
                                                            style={{ display: "block", width: 898, height: 245 }}
                                                            width={1796}
                                                            className="chartjs-render-monitor"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-12">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h4 className="card-title">Transaction History</h4>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="transaction-table">
                                                            <div className="table-responsive">
                                                                <table className="table mb-0 table-responsive-sm">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Category</th>
                                                                            <th>Date</th>
                                                                            <th>Description</th>
                                                                            <th>Amount</th>
                                                                            <th>Currency</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                <span className="table-category-icon">
                                                                                    <i className="bg-emerald-500 fi fi-rr-barber-shop" />
                                                                                    Beauty
                                                                                </span>
                                                                            </td>
                                                                            <td>12.12.2023</td>
                                                                            <td>Grocery Items and Beverage soft drinks</td>
                                                                            <td>-32.20</td>
                                                                            <td>USD</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <span className="table-category-icon">
                                                                                    <i className="bg-teal-500 fi fi-rr-receipt" />
                                                                                    Bills &amp; Fees
                                                                                </span>
                                                                            </td>
                                                                            <td>12.12.2023</td>
                                                                            <td>Grocery Items and Beverage soft drinks</td>
                                                                            <td>-32.20</td>
                                                                            <td>USD</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <span className="table-category-icon">
                                                                                    <i className="bg-cyan-500 fi fi-rr-car-side" />
                                                                                    Car
                                                                                </span>
                                                                            </td>
                                                                            <td>12.12.2023</td>
                                                                            <td>Grocery Items and Beverage soft drinks</td>
                                                                            <td>-32.20</td>
                                                                            <td>USD</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <span className="table-category-icon">
                                                                                    <i className="bg-sky-500 fi fi-rr-graduation-cap" />
                                                                                    Education
                                                                                </span>
                                                                            </td>
                                                                            <td>12.12.2023</td>
                                                                            <td>Grocery Items and Beverage soft drinks</td>
                                                                            <td>-32.20</td>
                                                                            <td>USD</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <span className="table-category-icon">
                                                                                    <i className="bg-blue-500 fi fi-rr-clapperboard-play" />
                                                                                    Entertainment
                                                                                </span>
                                                                            </td>
                                                                            <td>12.12.2023</td>
                                                                            <td>Grocery Items and Beverage soft drinks</td>
                                                                            <td>-32.20</td>
                                                                            <td>USD</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="a2" role="tabpanel">
                                        <div className="wallet-tab-title">
                                            <h3>Debit Card</h3>
                                        </div>
                                        <div className="row">
                                            <div className="col-xxl-6 col-xl-6 col-lg-6">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="wallet-total-balance">
                                                            <p className="mb-0">Total Balance</p>
                                                            <h2>$221,478</h2>
                                                        </div>
                                                        <div className="funds-credit">
                                                            <p className="mb-0">Personal Funds</p>
                                                            <h5>$32,500.28</h5>
                                                        </div>
                                                        <div className="funds-credit">
                                                            <p className="mb-0">Credit Limits</p>
                                                            <h5>$2500.00</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xxl-6 col-xl-6 col-lg-6">
                                                <div className="credit-card visa">
                                                    <div className="type-brand">
                                                        <h4>Debit Card</h4>
                                                        <img src="./images/cc/visa.png" alt="" />
                                                    </div>
                                                    <div className="cc-number">
                                                        <h6>1234</h6>
                                                        <h6>5678</h6>
                                                        <h6>7890</h6>
                                                        <h6>9875</h6>
                                                    </div>
                                                    <div className="cc-holder-exp">
                                                        <h5>Saiful Islam</h5>
                                                        <div className="exp">
                                                            <span>EXP:</span>
                                                            <strong>12/21</strong>
                                                        </div>
                                                    </div>
                                                    <div className="cc-info">
                                                        <div className="row justify-content-between align-items-center">
                                                            <div className="col-5">
                                                                <div className="d-flex">
                                                                    <p className="me-3">Status</p>
                                                                    <p>
                                                                        <strong>Active</strong>
                                                                    </p>
                                                                </div>
                                                                <div className="d-flex">
                                                                    <p className="me-3">Currency</p>
                                                                    <p>
                                                                        <strong>USD</strong>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-7">
                                                                <div className="d-flex justify-content-between">
                                                                    <div className="ms-3">
                                                                        <p>Credit Limit</p>
                                                                        <p>
                                                                            <strong>2000 USD</strong>
                                                                        </p>
                                                                    </div>
                                                                    <div id="circle4" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                <div className="stat-widget-1">
                                                    <h6>Total Balance</h6>
                                                    <h3>$ 432568</h3>
                                                    <p>
                                                        <span className="text-success">
                                                            <i className="fi fi-rr-arrow-trend-up" />
                                                            2.47%
                                                        </span>
                                                        Last month <strong>$24,478</strong>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                <div className="stat-widget-1">
                                                    <h6>Monthly Expenses</h6>
                                                    <h3>$ 432568</h3>
                                                    <p>
                                                        <span className="text-success">
                                                            <i className="fi fi-rr-arrow-trend-up" />
                                                            2.47%
                                                        </span>
                                                        Last month <strong>$24,478</strong>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-xxl-12">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h4 className="card-title">Balance Overtime</h4>
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
                                                            id="chartjsBalanceOvertime2"
                                                            height={0}
                                                            style={{ display: "block", width: 0, height: 0 }}
                                                            className="chartjs-render-monitor"
                                                            width={0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-12">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h4 className="card-title">Transaction History</h4>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="transaction-table">
                                                            <div className="table-responsive">
                                                                <table className="table mb-0 table-responsive-sm">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Category</th>
                                                                            <th>Date</th>
                                                                            <th>Description</th>
                                                                            <th>Amount</th>
                                                                            <th>Currency</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                <span className="table-category-icon">
                                                                                    <i className="bg-emerald-500 fi fi-rr-barber-shop" />
                                                                                    Beauty
                                                                                </span>
                                                                            </td>
                                                                            <td>12.12.2023</td>
                                                                            <td>Grocery Items and Beverage soft drinks</td>
                                                                            <td>-32.20</td>
                                                                            <td>USD</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <span className="table-category-icon">
                                                                                    <i className="bg-teal-500 fi fi-rr-receipt" />
                                                                                    Bills &amp; Fees
                                                                                </span>
                                                                            </td>
                                                                            <td>12.12.2023</td>
                                                                            <td>Grocery Items and Beverage soft drinks</td>
                                                                            <td>-32.20</td>
                                                                            <td>USD</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <span className="table-category-icon">
                                                                                    <i className="bg-cyan-500 fi fi-rr-car-side" />
                                                                                    Car
                                                                                </span>
                                                                            </td>
                                                                            <td>12.12.2023</td>
                                                                            <td>Grocery Items and Beverage soft drinks</td>
                                                                            <td>-32.20</td>
                                                                            <td>USD</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <span className="table-category-icon">
                                                                                    <i className="bg-sky-500 fi fi-rr-graduation-cap" />
                                                                                    Education
                                                                                </span>
                                                                            </td>
                                                                            <td>12.12.2023</td>
                                                                            <td>Grocery Items and Beverage soft drinks</td>
                                                                            <td>-32.20</td>
                                                                            <td>USD</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <span className="table-category-icon">
                                                                                    <i className="bg-blue-500 fi fi-rr-clapperboard-play" />
                                                                                    Entertainment
                                                                                </span>
                                                                            </td>
                                                                            <td>12.12.2023</td>
                                                                            <td>Grocery Items and Beverage soft drinks</td>
                                                                            <td>-32.20</td>
                                                                            <td>USD</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="a3" role="tabpanel">
                                        <div className="wallet-tab-title">
                                            <h3>Visa Card</h3>
                                        </div>
                                        <div className="row">
                                            <div className="col-xxl-6 col-xl-6 col-lg-6">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="wallet-total-balance">
                                                            <p className="mb-0">Total Balance</p>
                                                            <h2>$221,478</h2>
                                                        </div>
                                                        <div className="funds-credit">
                                                            <p className="mb-0">Personal Funds</p>
                                                            <h5>$32,500.28</h5>
                                                        </div>
                                                        <div className="funds-credit">
                                                            <p className="mb-0">Credit Limits</p>
                                                            <h5>$2500.00</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xxl-6 col-xl-6 col-lg-6">
                                                <div className="credit-card visa">
                                                    <div className="type-brand">
                                                        <h4>Debit Card</h4>
                                                        <img src="./images/cc/visa.png" alt="" />
                                                    </div>
                                                    <div className="cc-number">
                                                        <h6>1234</h6>
                                                        <h6>5678</h6>
                                                        <h6>7890</h6>
                                                        <h6>9875</h6>
                                                    </div>
                                                    <div className="cc-holder-exp">
                                                        <h5>Saiful Islam</h5>
                                                        <div className="exp">
                                                            <span>EXP:</span>
                                                            <strong>12/21</strong>
                                                        </div>
                                                    </div>
                                                    <div className="cc-info">
                                                        <div className="row justify-content-between align-items-center">
                                                            <div className="col-5">
                                                                <div className="d-flex">
                                                                    <p className="me-3">Status</p>
                                                                    <p>
                                                                        <strong>Active</strong>
                                                                    </p>
                                                                </div>
                                                                <div className="d-flex">
                                                                    <p className="me-3">Currency</p>
                                                                    <p>
                                                                        <strong>USD</strong>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-7">
                                                                <div className="d-flex justify-content-between">
                                                                    <div className="ms-3">
                                                                        <p>Credit Limit</p>
                                                                        <p>
                                                                            <strong>2000 USD</strong>
                                                                        </p>
                                                                    </div>
                                                                    <div id="circle5" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                <div className="stat-widget-1">
                                                    <h6>Total Balance</h6>
                                                    <h3>$ 432568</h3>
                                                    <p>
                                                        <span className="text-success">
                                                            <i className="fi fi-rr-arrow-trend-up" />
                                                            2.47%
                                                        </span>
                                                        Last month <strong>$24,478</strong>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                <div className="stat-widget-1">
                                                    <h6>Monthly Expenses</h6>
                                                    <h3>$ 432568</h3>
                                                    <p>
                                                        <span className="text-success">
                                                            <i className="fi fi-rr-arrow-trend-up" />
                                                            2.47%
                                                        </span>
                                                        Last month <strong>$24,478</strong>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-xxl-12">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h4 className="card-title">Balance Overtime</h4>
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
                                                            id="chartjsBalanceOvertime3"
                                                            height={0}
                                                            style={{ display: "block", width: 0, height: 0 }}
                                                            className="chartjs-render-monitor"
                                                            width={0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-12">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h4 className="card-title">Transaction History</h4>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="transaction-table">
                                                            <div className="table-responsive">
                                                                <table className="table mb-0 table-responsive-sm">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Category</th>
                                                                            <th>Date</th>
                                                                            <th>Description</th>
                                                                            <th>Amount</th>
                                                                            <th>Currency</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                <span className="table-category-icon">
                                                                                    <i className="bg-emerald-500 fi fi-rr-barber-shop" />
                                                                                    Beauty
                                                                                </span>
                                                                            </td>
                                                                            <td>12.12.2023</td>
                                                                            <td>Grocery Items and Beverage soft drinks</td>
                                                                            <td>-32.20</td>
                                                                            <td>USD</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <span className="table-category-icon">
                                                                                    <i className="bg-teal-500 fi fi-rr-receipt" />
                                                                                    Bills &amp; Fees
                                                                                </span>
                                                                            </td>
                                                                            <td>12.12.2023</td>
                                                                            <td>Grocery Items and Beverage soft drinks</td>
                                                                            <td>-32.20</td>
                                                                            <td>USD</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <span className="table-category-icon">
                                                                                    <i className="bg-cyan-500 fi fi-rr-car-side" />
                                                                                    Car
                                                                                </span>
                                                                            </td>
                                                                            <td>12.12.2023</td>
                                                                            <td>Grocery Items and Beverage soft drinks</td>
                                                                            <td>-32.20</td>
                                                                            <td>USD</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <span className="table-category-icon">
                                                                                    <i className="bg-sky-500 fi fi-rr-graduation-cap" />
                                                                                    Education
                                                                                </span>
                                                                            </td>
                                                                            <td>12.12.2023</td>
                                                                            <td>Grocery Items and Beverage soft drinks</td>
                                                                            <td>-32.20</td>
                                                                            <td>USD</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <span className="table-category-icon">
                                                                                    <i className="bg-blue-500 fi fi-rr-clapperboard-play" />
                                                                                    Entertainment
                                                                                </span>
                                                                            </td>
                                                                            <td>12.12.2023</td>
                                                                            <td>Grocery Items and Beverage soft drinks</td>
                                                                            <td>-32.20</td>
                                                                            <td>USD</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="a4" role="tabpanel">
                                        <div className="wallet-tab-title">
                                            <h3>Cash</h3>
                                        </div>
                                        <div className="row">
                                            <div className="col-xxl-6 col-xl-6 col-lg-6">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="wallet-total-balance">
                                                            <p className="mb-0">Total Balance</p>
                                                            <h2>$221,478</h2>
                                                        </div>
                                                        <div className="funds-credit">
                                                            <p className="mb-0">Personal Funds</p>
                                                            <h5>$32,500.28</h5>
                                                        </div>
                                                        <div className="funds-credit">
                                                            <p className="mb-0">Credit Limits</p>
                                                            <h5>$2500.00</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xxl-6 col-xl-6 col-lg-6">
                                                <div className="credit-card visa">
                                                    <div className="type-brand">
                                                        <h4>Debit Card</h4>
                                                        <img src="./images/cc/visa.png" alt="" />
                                                    </div>
                                                    <div className="cc-number">
                                                        <h6>1234</h6>
                                                        <h6>5678</h6>
                                                        <h6>7890</h6>
                                                        <h6>9875</h6>
                                                    </div>
                                                    <div className="cc-holder-exp">
                                                        <h5>Saiful Islam</h5>
                                                        <div className="exp">
                                                            <span>EXP:</span>
                                                            <strong>12/21</strong>
                                                        </div>
                                                    </div>
                                                    <div className="cc-info">
                                                        <div className="row justify-content-between align-items-center">
                                                            <div className="col-5">
                                                                <div className="d-flex">
                                                                    <p className="me-3">Status</p>
                                                                    <p>
                                                                        <strong>Active</strong>
                                                                    </p>
                                                                </div>
                                                                <div className="d-flex">
                                                                    <p className="me-3">Currency</p>
                                                                    <p>
                                                                        <strong>USD</strong>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-7">
                                                                <div className="d-flex justify-content-between">
                                                                    <div className="ms-3">
                                                                        <p>Credit Limit</p>
                                                                        <p>
                                                                            <strong>2000 USD</strong>
                                                                        </p>
                                                                    </div>
                                                                    <div id="circle2" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                <div className="stat-widget-1">
                                                    <h6>Total Balance</h6>
                                                    <h3>$ 432568</h3>
                                                    <p>
                                                        <span className="text-success">
                                                            <i className="fi fi-rr-arrow-trend-up" />
                                                            2.47%
                                                        </span>
                                                        Last month <strong>$24,478</strong>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                <div className="stat-widget-1">
                                                    <h6>Monthly Expenses</h6>
                                                    <h3>$ 432568</h3>
                                                    <p>
                                                        <span className="text-success">
                                                            <i className="fi fi-rr-arrow-trend-up" />
                                                            2.47%
                                                        </span>
                                                        Last month <strong>$24,478</strong>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-xxl-12">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h4 className="card-title">Balance Overtime</h4>
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
                                                            id="chartjsBalanceOvertime4"
                                                            height={0}
                                                            style={{ display: "block", width: 0, height: 0 }}
                                                            className="chartjs-render-monitor"
                                                            width={0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-12">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h4 className="card-title">Transaction History</h4>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="transaction-table">
                                                            <div className="table-responsive">
                                                                <table className="table mb-0 table-responsive-sm">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Category</th>
                                                                            <th>Date</th>
                                                                            <th>Description</th>
                                                                            <th>Amount</th>
                                                                            <th>Currency</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                <span className="table-category-icon">
                                                                                    <i className="bg-emerald-500 fi fi-rr-barber-shop" />
                                                                                    Beauty
                                                                                </span>
                                                                            </td>
                                                                            <td>12.12.2023</td>
                                                                            <td>Grocery Items and Beverage soft drinks</td>
                                                                            <td>-32.20</td>
                                                                            <td>USD</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <span className="table-category-icon">
                                                                                    <i className="bg-teal-500 fi fi-rr-receipt" />
                                                                                    Bills &amp; Fees
                                                                                </span>
                                                                            </td>
                                                                            <td>12.12.2023</td>
                                                                            <td>Grocery Items and Beverage soft drinks</td>
                                                                            <td>-32.20</td>
                                                                            <td>USD</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <span className="table-category-icon">
                                                                                    <i className="bg-cyan-500 fi fi-rr-car-side" />
                                                                                    Car
                                                                                </span>
                                                                            </td>
                                                                            <td>12.12.2023</td>
                                                                            <td>Grocery Items and Beverage soft drinks</td>
                                                                            <td>-32.20</td>
                                                                            <td>USD</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <span className="table-category-icon">
                                                                                    <i className="bg-sky-500 fi fi-rr-graduation-cap" />
                                                                                    Education
                                                                                </span>
                                                                            </td>
                                                                            <td>12.12.2023</td>
                                                                            <td>Grocery Items and Beverage soft drinks</td>
                                                                            <td>-32.20</td>
                                                                            <td>USD</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <span className="table-category-icon">
                                                                                    <i className="bg-blue-500 fi fi-rr-clapperboard-play" />
                                                                                    Entertainment
                                                                                </span>
                                                                            </td>
                                                                            <td>12.12.2023</td>
                                                                            <td>Grocery Items and Beverage soft drinks</td>
                                                                            <td>-32.20</td>
                                                                            <td>USD</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
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
                </div>
            </div>

        </>
    )
}

export default Wallets
