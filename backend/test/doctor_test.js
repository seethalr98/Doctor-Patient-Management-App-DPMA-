const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const { expect } = chai;

const Doctor = require('../models/Doctor');
const { getDoctorProfile } = require('../controllers/doctorController');

describe('getDoctorProfile', () => {
  it('should return doctor profile if found', async () => {
    const mockDoctor = {
      _id: new mongoose.Types.ObjectId(),
      name: 'Dr. John Doe',
      email: 'john@example.com',
      specialization: 'Cardiology',
      userId: new mongoose.Types.ObjectId()
    };

    const req = { user: { id: mockDoctor.userId } };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    const findOneStub = sinon.stub(Doctor, 'findOne').resolves(mockDoctor);

    await getDoctorProfile(req, res);

    expect(findOneStub.calledOnceWith({ userId: req.user.id })).to.be.true;
    expect(res.json.calledWith(mockDoctor)).to.be.true;

    findOneStub.restore();
  });
});
