import React from 'react';
import { useNavigate } from 'react-router-dom';

const PatientHome = () => {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '900px', margin: '50px auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '30px' }}>
        Welcome, Patient 👤
      </h1>

      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
        {/* Schedule Appointment */}
        <div
          onClick={() => navigate('/patient/schedule')}
          style={cardStyle}
        >
          <h2 style={titleStyle}>Schedule Appointment</h2>
          <p>Book a consultation with a doctor.</p>
        </div>

        {/* Patient Profile */}
        <div
          onClick={() => navigate('/patient/profile')}
          style={cardStyle}
        >
          <h2 style={titleStyle}>My Profile</h2>
          <p>View and update your personal information.</p>
        </div>

        {/* Upcoming Appointments */}
        <div
          onClick={() => navigate('/patient/appointments')}
          style={cardStyle}
        >
          <h2 style={titleStyle}>My Appointments</h2>
          <p>View or cancel your upcoming appointments.</p>
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  cursor: 'pointer',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  flex: '1 1 250px',
  backgroundColor: '#f9f9f9',
  textAlign: 'center',
};

const titleStyle = {
  fontSize: '1.2rem',
  marginBottom: '10px',
};

export default PatientHome;
