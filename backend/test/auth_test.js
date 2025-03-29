const { expect } = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { registerUser } = require('../controllers/authController');

describe('Auth Controller - registerUser', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should register a new user and return 201 with token', async () => {
    const req = {
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'patient'
      }
    };

    const fakeUser = {
      id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      role: req.body.role
    };

    sinon.stub(User, 'findOne').resolves(null);
    sinon.stub(User, 'create').resolves(fakeUser);
    sinon.stub(jwt, 'sign').returns('fake-jwt-token');

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await registerUser(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledOnce).to.be.true;

    const responseArg = res.json.firstCall.args[0];
    expect(responseArg).to.include({
      name: fakeUser.name,
      email: fakeUser.email,
      role: fakeUser.role,
      token: 'fake-jwt-token'
    });
  });

  it('should return 400 if user already exists', async () => {
    const req = {
      body: {
        name: 'Jane',
        email: 'jane@example.com',
        password: 'test123',
        role: 'doctor'
      }
    };

    sinon.stub(User, 'findOne').resolves({ email: req.body.email });

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await registerUser(req, res);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ message: 'User already exists' })).to.be.true;
  });

  it('should return 500 if there is an error', async () => {
    const req = {
      body: {
        name: 'Error',
        email: 'error@example.com',
        password: 'error',
        role: 'doctor'
      }
    };

    sinon.stub(User, 'findOne').throws(new Error('DB Error'));

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await registerUser(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;
  });
});
