const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const { expect } = chai;

const Patient = require('../models/Patient');
const { getPatientProfile } = require('../controllers/patientController');

describe('getPatientProfile', () => {
  it('should return patient profile if found', async () => {
    const mockPatient = {
      _id: new mongoose.Types.ObjectId(),
      name: 'Jane Doe',
      email: 'jane@example.com',
      age: 30,
      contact: '9876543210',
      userId: new mongoose.Types.ObjectId()
    };

    const req = { user: { id: mockPatient.userId } };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    const findOneStub = sinon.stub(Patient, 'findOne').resolves(mockPatient);

    await getPatientProfile(req, res);

    expect(findOneStub.calledOnceWith({ userId: req.user.id })).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(mockPatient)).to.be.true;

    findOneStub.restore();
  });
});
