import React, { useEffect, useState } from 'react';
import { getAllLicenses } from './ApiClient';

const LicenseStats = () => {
  const [stats, setStats] = useState({ total: 0, active: 0, expired: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getAllLicenses();
        const licenses = response.data || [];
        const now = new Date();
        let active = 0, expired = 0;
        licenses.forEach(lic => {
          const isExpired = new Date(lic.expiryDate) < now || lic.status === 'expired' || lic.status === 'inactive';
          if (isExpired) expired++;
          else active++;
        });
        setStats({ total: licenses.length, active, expired });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch license stats');
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="license-stats-box">Loading stats...</div>;
  if (error) return <div className="license-stats-box">{error}</div>;

  return (
    <div className="license-stats-box">
      <div className="license-stats-title">License Overview</div>
      <div className="license-stats-row">
        <span className="license-stats-label">Total License:</span>
        <span className="license-stats-value">{stats.total}</span>
      </div>
      <div className="license-stats-row">
        <span className="license-stats-label">Active License:</span>
        <span className="license-stats-value">{stats.active}</span>
      </div>
      <div className="license-stats-row">
        <span className="license-stats-label">Expired License:</span>
        <span className="license-stats-value">{stats.expired}</span>
      </div>
    </div>
  );
};

export default LicenseStats; 