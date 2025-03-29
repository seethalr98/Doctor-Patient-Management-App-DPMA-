const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAppointmentsForPatient,
  deleteAppointment
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createAppointment)
  .get(protect, getAppointmentsForPatient);


router.route('/:id').delete(protect, deleteAppointment);

module.exports = router;
