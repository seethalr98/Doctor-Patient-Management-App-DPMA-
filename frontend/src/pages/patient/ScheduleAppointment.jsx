import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';

const ScheduleAppointment = () => {
  const [appointment, setAppointment] = useState({
    doctor: '',
    doctorEmail: '',
    date: '',
    time: '',
    reason: '',
  });

  const [doctors, setDoctors] = useState([]);

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axiosInstance.get('/api/doctors/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctors(res.data);
      } catch (err) {
        console.error('Failed to load doctors:', err);
      }
    };

    fetchDoctors();
  }, []);

  const handleDoctorSelect = (e) => {
    const selectedEmail = e.target.value;
    const selectedDoctor = doctors.find(doc => doc.email === selectedEmail);

    setAppointment({
      ...appointment,
      doctorEmail: selectedEmail,
      doctor: selectedDoctor?.name || '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.post('/api/appointments', appointment, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`Appointment scheduled with ${appointment.doctor} on ${appointment.date}`);
      setAppointment({ doctor: '', doctorEmail: '', date: '', time: '', reason: '' });
    } catch (error) {
      alert('Failed to schedule appointment.');
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Schedule Appointment</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="doctorEmail"
          value={appointment.doctorEmail}
          onChange={handleDoctorSelect}
          style={inputStyle}
          required
        >
          <option value="">-- Select a Doctor --</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc.email}>
              {doc.name} ({doc.email})
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={appointment.date}
          min={new Date().toISOString().split('T')[0]}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="time"
          name="time"
          value={appointment.time}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <textarea
          name="reason"
          placeholder="Reason for appointment"
          value={appointment.reason}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <button type="submit" style={btnStyle}>Book Appointment</button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
};

const btnStyle = {
  padding: '10px 20px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
};

export default ScheduleAppointment;