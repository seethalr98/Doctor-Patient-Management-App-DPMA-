const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

const createAppointment = async (req, res) => {
  const { doctor, date, time, reason } = req.body;
  try {
    
    const newAppointment = await Appointment.create({
      doctor,
      date,
      time,
      reason,
      userId: req.user.id,
    });
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to schedule appointment', error: error.message });
  }
};

const getAppointmentsForPatient = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id }).sort({ date: 1, time: 1 });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointments', error: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment canceled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete appointment', error: error.message });
  }
};

const getDoctorAppointments = async (req, res) => {
    try {

      const doctor = await Doctor.findOne({ userId: req.user.id });
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor profile not found' });
      }
      const appointments = await Appointment.find({ doctor: doctor.name }).sort({ date: 1, time: 1 });
      
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch doctor appointments', error: error.message });
    }
  };
  

module.exports = {
  createAppointment,
  getAppointmentsForPatient,
  deleteAppointment,
  getDoctorAppointments,
};
