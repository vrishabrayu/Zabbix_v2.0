import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.doodleanetwork.com/api',
  headers: {
    'ngrok-skip-browser-warning': 'true'
  }
});

export const checkLicense = (licenseKey) => {
  return apiClient.get(`/check-license/${licenseKey}`);
};

export const generateLicense = (data) => {
  return apiClient.post('/generate-license', data);
};

export const getAllLicenses = () => {
  return apiClient.get('/all-licenses');
};

export const deleteLicense = (licenseKey) => {
  return apiClient.delete(`/delete-license/${licenseKey}`);
};

export const updateLicense = (licenseKey, data) => {
  return apiClient.patch(`/update-license/${licenseKey}`, data);
}; 