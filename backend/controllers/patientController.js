const Patient = require('../models/Patient');
const User = require('../models/User');

const updatePatientProfile = async (req, res) => {
  const { name, email, age, contact } = req.body;

  try {
    let patient = await Patient.findOne({ userId: req.user.id });

    if (!patient) {
      patient = await Patient.create({
        userId: req.user.id,
        name,
        email,
        age,
        contact,
      });
    } else {
      patient.name = name || patient.name;
      patient.email = email || patient.email;
      patient.age = age || patient.age;
      patient.contact = contact || patient.contact;
      await patient.save();
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.user.id });

    if (!patient) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const getAllPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: 'patient' }).select('_id name email');
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch patients', error: err.message });
  }
};

module.exports = { updatePatientProfile, getPatientProfile,getAllPatients };
