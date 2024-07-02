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
        <button onClick={toggleTheme}>
          Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
      <Main />
    </>
  );
}

export default Dashboard;
