import React from 'react'
import Sidebar from '../../Component/DashboardSidebar/DashboardSidebar';
import Main from '../../Component/Main/Main';
import style from './Dashboard.module.css'


function Dashboard() {
    return (
        <>
            <div className={style.div}>
                <Sidebar />
            </div>
            <Main />
        </>
    )
}

export default Dashboard