const express = require('express');
const router = express.Router();
const {
  updatePatientProfile,
  getPatientProfile,
  getAllPatients
} = require('../controllers/patientController');
const { protect } = require('../middleware/authMiddleware');

router.route('/profile')
  .get(protect, getPatientProfile)
  .put(protect, updatePatientProfile);

router.get('/all', protect, getAllPatients);

module.exports = router;
