const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
    },
    bloodGroup: {
      type: String,
      required: [true, 'Blood group is required'],
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    contactNumber: {
      type: String,
      default: '',
    },
    urgency: {
      type: String,
      enum: ['normal', 'urgent', 'critical'],
      default: 'normal',
    },
    status: {
      type: String,
      enum: ['open', 'fulfilled', 'closed'],
      default: 'open',
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    centerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BloodCenter',
      default: null,
    },
    centerName: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);
