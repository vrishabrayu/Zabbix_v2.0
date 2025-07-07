import React, { useState } from 'react';
import { generateLicense } from './ApiClient';

const CreateLicenseForm = ({ onLicenseCreated }) => {
  const [clientId, setClientId] = useState('');
  const [email, setEmail] = useState('');
  const [years, setYears] = useState('1');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Calculate expiry date
    const now = new Date();
    const expiryDate = new Date(now.setFullYear(now.getFullYear() + parseInt(years)));

    try {
      const response = await generateLicense({ clientId, expiryDate, email });
      setSuccess(`License created successfully! License Key: ${response.data.licenseKey}, Instance ID: ${response.data.instanceId}`);
      setClientId('');
      setEmail('');
      setYears('1');
      if (onLicenseCreated) {
        onLicenseCreated();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating license');
    }
  };

  return (
    <div className="create-license-form">
      <h3>Create New License</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Client ID:</label>
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Expiry Period:</label>
          <select value={years} onChange={e => setYears(e.target.value)} required>
            <option value="1">1 year</option>
            <option value="2">2 years</option>
            <option value="3">3 years</option>
            <option value="4">4 years</option>
            <option value="5">5 years</option>
          </select>
        </div>
        <button type="submit">Generate License</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default CreateLicenseForm; 