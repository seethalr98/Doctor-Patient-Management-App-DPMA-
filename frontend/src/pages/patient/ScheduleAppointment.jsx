import React, { useEffect, useState } from 'react';

import axiosInstance from '../../axiosConfig';

const ScheduleAppointment = () => {
  const [appointment, setAppointment] = useState({
    doctor: '',
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDoctors(res.data); // list of doctor users
      } catch (err) {
        console.error('Failed to load doctors:', err);
      }
    };
  
    fetchDoctors();
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.post('/api/appointments', appointment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(`Appointment scheduled with ${appointment.doctor} on ${appointment.date}`);
      setAppointment({ doctor: '', date: '', time: '', reason: '' }); // clear form
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
  name="doctor"
  value={appointment.doctor}
  onChange={handleChange}
  style={inputStyle}
  required
>
  <option value="">-- Select a Doctor --</option> {/* This is the key fix */}
  {doctors.map((doc) => (
    <option key={doc._id} value={doc.name}>
      {doc.name} ({doc.email})
    </option>
  ))}
</select>


<input
  type="date"
  name="date"
  value={appointment.date}
  min={new Date().toISOString().split('T')[0]} // today’s date
  onChange={handleChange}
  style={inputStyle}
/>

        <input
          type="time"
          name="time"
          value={appointment.time}
          onChange={handleChange}
          style={inputStyle}
        />
        <textarea
          name="reason"
          placeholder="Reason for appointment"
          value={appointment.reason}
          onChange={handleChange}
          style={inputStyle}
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
