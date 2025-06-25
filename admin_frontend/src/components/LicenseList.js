import React, { useEffect, useState } from 'react';
import { getAllLicenses, deleteLicense } from './ApiClient';

const LicenseList = () => {
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const response = await getAllLicenses();
        setLicenses(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchLicenses();
  }, []);

  const handleDelete = async (licenseKey) => {
    try {
      setLoading(true);
      await deleteLicense(licenseKey);
      setLicenses(licenses.filter((license) => license.licenseKey !== licenseKey));
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  if (loading) return <p>Loading licenses...</p>;
  if (error) return <p>Error fetching licenses: {error.message}</p>;

  return (
    <div className="license-list">
      <h3>All Licenses</h3>
      <table>
        <thead>
          <tr>
            <th>License Key</th>
            <th>Client ID</th>
            <th>Status</th>
            <th>Expiry Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {licenses.map((license) => (
            <tr key={license._id}>
              <td>{license.licenseKey}</td>
              <td>{license.clientId}</td>
              <td>{license.status}</td>
              <td>{new Date(license.expiryDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleDelete(license.licenseKey)} title="Delete License" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  {/* Simple SVG dustbin icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 7h12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12zm-7 4v6m4-6v6" /></svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LicenseList; 