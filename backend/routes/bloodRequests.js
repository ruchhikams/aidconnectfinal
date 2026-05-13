const express = require('express');
const router = express.Router();
const { getBloodRequests, createBloodRequest } = require('../controllers/bloodRequestsController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getBloodRequests);
router.post('/', protect, createBloodRequest);

module.exports = router;
