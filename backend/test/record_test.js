const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const { expect } = chai;

const User = require('../models/User');
const MedicalRecord = require('../models/MedicalRecord');
const { addMedicalRecord } = require('../controllers/recordController');

describe('addMedicalRecord', () => {
  it('should create and return new medical record for valid patient email', async () => {
    const mockUser = {
      _id: new mongoose.Types.ObjectId(),
      email: 'patient@example.com'
    };

    const mockRecord = {
      _id: new mongoose.Types.ObjectId(),
      patientId: mockUser._id,
      doctorId: new mongoose.Types.ObjectId(),
      date: '2024-04-01',
      diagnosis: 'Flu',
      prescription: 'Paracetamol',
      notes: 'Take rest',
    };

    const req = {
      user: { id: mockRecord.doctorId },
      body: {
        patientEmail: mockUser.email,
        date: mockRecord.date,
        diagnosis: mockRecord.diagnosis,
        prescription: mockRecord.prescription,
        notes: mockRecord.notes
      }
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Stubbing DB calls
    const findUserStub = sinon.stub(User, 'findOne').resolves(mockUser);
    const createRecordStub = sinon.stub(MedicalRecord, 'create').resolves(mockRecord);

    await addMedicalRecord(req, res);

    expect(findUserStub.calledOnceWith({ email: mockUser.email })).to.be.true;
    expect(createRecordStub.calledOnce).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(mockRecord)).to.be.true;

    // Cleanup
    findUserStub.restore();
    createRecordStub.restore();
  });
});
