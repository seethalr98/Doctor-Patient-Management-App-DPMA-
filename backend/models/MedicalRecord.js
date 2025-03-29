const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: String, required: true },
  diagnosis: { type: String },
  prescription: { type: String },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('MedicalRecord', recordSchema);
