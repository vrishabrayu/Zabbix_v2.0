import React, { useState } from 'react';
import { generateLicense } from './ApiClient';

const CreateLicenseForm = ({ onLicenseCreated }) => {
  const [clientId, setClientId] = useState('');
  const [email, setEmail] = useState('');
  const [years, setYears] = useState('1');
  const [product, setProduct] = useState('zabbix');
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
      const response = await generateLicense({ clientId, expiryDate, email, product });
      setSuccess(`License created successfully! License Key: ${response.data.licenseKey}, Instance ID: ${response.data.instanceId}`);
      setClientId('');
      setEmail('');
      setYears('1');
      setProduct('zabbix');
      if (onLicenseCreated) {
        onLicenseCreated();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating license');
    }
  };

  return (
    <div className="create-license-form enhanced-form">
      <h3 className="form-title">Create New License</h3>
      <form onSubmit={handleSubmit} className="form-fields">
        <div className="form-group">
          <label htmlFor="clientId">Client ID:</label>
          <input
            id="clientId"
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="years">Expiry Period:</label>
          <select id="years" value={years} onChange={e => setYears(e.target.value)} required className="form-input">
            <option value="1">1 year</option>
            <option value="2">2 years</option>
            <option value="3">3 years</option>
            <option value="4">4 years</option>
            <option value="5">5 years</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="product">Product:</label>
          <select id="product" value={product} onChange={e => setProduct(e.target.value)} required className="form-input">
            <option value="zabbix">Zabbix</option>
            <option value="grafana">Grafana</option>
          </select>
        </div>
        <button type="submit" className="form-submit-btn">Generate License</button>
      </form>
      {error && <p className="error form-error">{error}</p>}
      {success && (
        <div className="license-key-box form-success">
          <h4>License Created!</h4>
          <div><b>License Key:</b> {success.match(/License Key: ([^,]+)/)?.[1]}</div>
          <div><b>Instance ID:</b> {success.match(/Instance ID: (.+)$/)?.[1]}</div>
        </div>
      )}
    </div>
  );
};

export default CreateLicenseForm; 