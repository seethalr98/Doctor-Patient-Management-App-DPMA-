const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctor: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  reason: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
