const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const User = require('../models/User'); 

const getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user.id });
    if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: 'Error loading profile', error: err.message });
  }
};

const updateDoctorProfile = async (req, res) => {
  const { name, email, specialization } = req.body;
  try {
    let doctor = await Doctor.findOne({ userId: req.user.id });
    if (!doctor) {
      doctor = await Doctor.create({ userId: req.user.id, name, email, specialization });
    } else {
      doctor.name = name || doctor.name;
      doctor.email = email || doctor.email;
      doctor.specialization = specialization || doctor.specialization;
      await doctor.save();
    }
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

const getDoctorAppointments = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user.id });
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    const appointments = await Appointment.find({ doctor: doctor.name });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointments', error: err.message });
  }
};

const getAllDoctors = async (req, res) => {
    try {
      const doctors = await User.find({ role: 'doctor' }).select('_id name email');
      res.json(doctors);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch doctors', error: err.message });
    }
  };

module.exports = {
  getDoctorProfile,
  updateDoctorProfile,
  getDoctorAppointments,
  getAllDoctors,
};
