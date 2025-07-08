import { Schema, model } from 'mongoose';

const licenseSchema = new Schema({
  licenseKey: {
    type: String,
    required: true,
    unique: true,
  },
  instanceId: {
    type: String,
    required: true,
    unique: true,
  },
  clientId: {
    type: String,
    required: true,
  },
  email: { // 👈 New field added here
    type: String,
    required: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'expired'],
    default: 'active',
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  application: {
    type: String,
    required: true,
    enum: ['zabbix', 'grafana'],
  },
});

export default model('License', licenseSchema);