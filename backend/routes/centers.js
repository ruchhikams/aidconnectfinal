const express = require('express');
const router = express.Router();
const { getCenters, createCenter } = require('../controllers/centersController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getCenters);
router.post('/', protect, createCenter);

module.exports = router;
