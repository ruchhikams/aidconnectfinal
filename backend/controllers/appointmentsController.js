const Appointment = require('../models/Appointment');
const BloodCenter = require('../models/BloodCenter');

// @desc    Get appointments for logged-in user
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user._id })
      .populate('centerId', 'name location')
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
};

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
  try {
    const { centerId, bloodGroup, appointmentDate, donorName } = req.body;

    if (!centerId || !bloodGroup || !appointmentDate || !donorName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const center = await BloodCenter.findById(centerId);
    if (!center) {
      return res.status(404).json({ message: 'Blood center not found' });
    }

    const appointment = await Appointment.create({
      userId: req.user._id,
      centerId,
      bloodGroup,
      appointmentDate: new Date(appointmentDate),
      donorName,
    });

    const populated = await appointment.populate('centerId', 'name location');

    res.status(201).json({ message: 'Appointment booked successfully', appointment: populated });
  } catch (error) {
    res.status(500).json({ message: 'Error creating appointment', error: error.message });
  }
};

module.exports = { getAppointments, createAppointment };
