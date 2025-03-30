const MedicalRecord = require('../models/MedicalRecord');

const User = require('../models/User');

const getRecordsByPatientId = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.patientEmail });

    if (!user) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const records = await MedicalRecord.find({ patientId: user._id });

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching records', error: err.message });
  }
};


const addMedicalRecord = async (req, res) => {
    const { patientEmail, date, diagnosis, prescription, notes } = req.body;
  
  
    try {
      const user = await User.findOne({ email: patientEmail });
  
      if (!user) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      const newRecord = await MedicalRecord.create({
        patientId: user._id,
        doctorId: req.user.id,
        date,
        diagnosis,
        prescription,
        notes,
      });
  
      res.status(201).json(newRecord);
    } catch (err) {
      res.status(500).json({ message: 'Error saving record', error: err.message });
    }
  };
module.exports = {
  getRecordsByPatientId,
  addMedicalRecord,
};
