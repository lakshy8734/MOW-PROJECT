import React, { useContext } from 'react';
import Sidebar from '../../Component/DashboardSidebar/DashboardSidebar';
import Main from '../../Component/Main/Main';
import style from './Dashboard.module.css';
import { ThemeContext } from '../../contexts/ThemeContext';

function Dashboard() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <div className={style.div}>
        <Sidebar />
        
      </div>
      <Main />
    </>
  );
}

export default Dashboard;
