import React from 'react'
import Header from './include/Header'
import Footer from './include/Footer'
import SideBar from './include/SideBar'


function Base({ children }) {

    return (
        <div id='main-wrapper' className='show'>
            <Header />
            <SideBar />
            <div className="dashboard">
                <div className="content-body">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Base