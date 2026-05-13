const express = require('express');
const router = express.Router();
const { getAppointments, createAppointment } = require('../controllers/appointmentsController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getAppointments);
router.post('/', protect, createAppointment);

module.exports = router;
