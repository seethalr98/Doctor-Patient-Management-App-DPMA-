console.log("✅ recordRoutes.js loaded");
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getRecordsByPatientId,
  addMedicalRecord,
} = require('../controllers/recordController');

router.get('/:patientEmail', protect, getRecordsByPatientId);
router.post('/', protect, addMedicalRecord);

module.exports = router;
