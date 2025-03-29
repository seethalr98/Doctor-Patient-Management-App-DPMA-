const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getDoctorProfile,
  updateDoctorProfile,
  getDoctorAppointments,
  getAllDoctors
} = require('../controllers/doctorController');

router.route('/profile')
  .get(protect, getDoctorProfile)
  .put(protect, updateDoctorProfile);

router.get('/appointments', protect, getDoctorAppointments);
router.get('/all', protect, getAllDoctors);

module.exports = router;
