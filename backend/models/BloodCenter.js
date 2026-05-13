const mongoose = require('mongoose');

const bloodCenterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Center name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    availableBloodGroups: {
      type: [String],
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      default: [],
    },
    phone: {
      type: String,
      default: '',
    },
    openHours: {
      type: String,
      default: '9:00 AM - 5:00 PM',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BloodCenter', bloodCenterSchema);
