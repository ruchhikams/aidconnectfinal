const mongoose = require('mongoose');
const BloodRequest = require('../models/BloodRequest');

const VALID_URGENCY = ['normal', 'urgent', 'critical'];

// @desc    Get all blood requests
// @route   GET /api/blood-requests
// @access  Private
const getBloodRequests = async (req, res) => {
  try {
    const { bloodGroup, status } = req.query;
    let query = {};

    if (bloodGroup) query.bloodGroup = bloodGroup;
    if (status) query.status = status;

    const requests = await BloodRequest.find(query)
      .populate('requestedBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blood requests', error: error.message });
  }
};

// @desc    Create a blood request
// @route   POST /api/blood-requests
// @access  Private
const createBloodRequest = async (req, res) => {
  try {
    const { patientName, bloodGroup, location, contactNumber, urgency, centerId, centerName } = req.body;

    if (!patientName || !bloodGroup || !location) {
      return res.status(400).json({ message: 'Patient name, blood group, and location are required' });
    }

    let urgencyNorm = typeof urgency === 'string' ? urgency.trim().toLowerCase() : urgency;
    if (!VALID_URGENCY.includes(urgencyNorm)) urgencyNorm = 'normal';

    const bloodRequest = await BloodRequest.create({
      patientName,
      bloodGroup,
      location,
      contactNumber: contactNumber || '',
      urgency: urgencyNorm,
      requestedBy: req.user._id,
      centerId: centerId && mongoose.Types.ObjectId.isValid(centerId) ? centerId : null,
      centerName: centerName ? String(centerName).trim() : '',
    });

    res.status(201).json({ message: 'Blood request submitted successfully', bloodRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error creating blood request', error: error.message });
  }
};

module.exports = { getBloodRequests, createBloodRequest };
