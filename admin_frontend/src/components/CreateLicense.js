import React, { useState } from 'react';
import CreateLicenseForm from './CreateLicenseForm';

const CreateLicense = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const handleLicenseCreated = () => setRefreshKey(prev => prev + 1);
  return (
    <div className="page-content">
      <CreateLicenseForm onLicenseCreated={handleLicenseCreated} key={refreshKey} />
    </div>
  );
};

export default CreateLicense; 