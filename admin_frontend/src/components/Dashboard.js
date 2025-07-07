import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>Zabbix Admin</h2>
        <nav>
          <ul>
            <li><NavLink to="/dashboard/create-license" className={({ isActive }) => isActive ? 'active' : ''}>Create License</NavLink></li>
            <li><NavLink to="/dashboard/all-licenses" className={({ isActive }) => isActive ? 'active' : ''}>All Licenses</NavLink></li>
          </ul>
        </nav>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </aside>
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard; 