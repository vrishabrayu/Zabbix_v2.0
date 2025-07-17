import React, { useState } from 'react';
import CreateLicenseForm from './CreateLicenseForm';
import DigitalClock from './DigitalClock';
import LicenseStats from './LicenseStats';

const CreateLicense = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const handleLicenseCreated = () => setRefreshKey(prev => prev + 1);
  return (
    <div className="create-license-dashboard" style={{ display: 'flex', alignItems: 'flex-start', gap: 40 }}>
      <CreateLicenseForm onLicenseCreated={handleLicenseCreated} key={refreshKey} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <DigitalClock />
        <LicenseStats key={refreshKey} />
      </div>
    </div>
  );
};

export default CreateLicense; 