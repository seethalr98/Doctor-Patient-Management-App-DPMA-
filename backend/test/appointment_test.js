const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const { expect } = chai;
const Appointment = require('../models/Appointment');
const { createAppointment } = require('../controllers/appointmentController');

describe('createAppointment', () => {
  it('should create an appointment successfully', async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: {
        doctor: 'Dr. Smith',
        date: '2025-04-01',
        time: '10:00',
        reason: 'Routine checkup'
      }
    };

    const expectedAppointment = {
      _id: new mongoose.Types.ObjectId(),
      ...req.body,
      userId: req.user.id
    };

    const createStub = sinon.stub(Appointment, 'create').resolves(expectedAppointment);

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await createAppointment(req, res);

    expect(createStub.calledOnceWith({ ...req.body, userId: req.user.id })).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(expectedAppointment)).to.be.true;

    createStub.restore();
  });
});
