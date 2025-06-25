import React, { useState } from 'react';
import LicenseList from './LicenseList';
import CreateLicenseForm from './CreateLicenseForm';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const [key, setKey] = useState(0);
  const navigate = useNavigate();

  const handleLicenseCreated = () => {
    setKey(prevKey => prevKey + 1);
  };
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
      <div className="dashboard-content">
        <CreateLicenseForm onLicenseCreated={handleLicenseCreated} />
        <LicenseList key={key} />
      </div>
    </div>
  );
};

export default Dashboard; 