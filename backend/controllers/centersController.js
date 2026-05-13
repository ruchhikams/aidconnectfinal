const BloodCenter = require('../models/BloodCenter');

const normalizeBloodGroups = (value) => (Array.isArray(value) ? value : []);

const normLoc = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Primary address segment (before first comma) must equal the search phrase — normalized, case-insensitive.
 * "MG Road, Bengaluru" matches search "mg road". "Downtown" does not.
 */
const primarySegmentExactMatch = (centerLocation, userPhrase) => {
  const phrase = normLoc(userPhrase);
  if (!phrase) return true;
  const first = normLoc(centerLocation).split(',')[0].trim();
  return first === phrase;
};

const toCenterJson = (doc) => {
  const o = doc && typeof doc.toObject === 'function' ? doc.toObject() : { ...doc };
  return { ...o, availableBloodGroups: normalizeBloodGroups(o.availableBloodGroups) };
};

// @desc    Get all blood centers
// @route   GET /api/centers
// @access  Private
const getCenters = async (req, res) => {
  try {
    const { bloodGroup, location } = req.query;
    let query = {};

    if (bloodGroup) {
      query.availableBloodGroups = bloodGroup;
    }

    const loc = location && String(location).trim();

    let centers = await BloodCenter.find(query).sort({ createdAt: -1 });
    if (loc) {
      centers = centers.filter((c) => primarySegmentExactMatch(c.location, loc));
    }
    res.json(centers.map(toCenterJson));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching centers', error: error.message });
  }
};

// @desc    Create a blood center
// @route   POST /api/centers
// @access  Private
const createCenter = async (req, res) => {
  try {
    const { name, location, availableBloodGroups, phone, openHours } = req.body;

    if (!name || !location) {
      return res.status(400).json({ message: 'Name and location are required' });
    }

    const center = await BloodCenter.create({
      name,
      location,
      availableBloodGroups: normalizeBloodGroups(availableBloodGroups),
      phone: phone || '',
      openHours: openHours || '9:00 AM - 5:00 PM',
    });

    res.status(201).json({ message: 'Blood center added successfully', center: toCenterJson(center) });
  } catch (error) {
    res.status(500).json({ message: 'Error creating center', error: error.message });
  }
};

module.exports = { getCenters, createCenter };
