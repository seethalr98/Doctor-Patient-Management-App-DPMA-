import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axiosInstance.get('/api/appointments', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointments(res.data);
    } catch (error) {
      alert('Failed to fetch appointments.');
      console.error(error);
    }
  };

  const deleteAppointment = async (id) => {
    const confirm = window.confirm('Are you sure you want to cancel this appointment?');
    if (!confirm) return;

    try {
      console.log("Deleting appointment with ID:", id); // 🔍 Debug log
      const token = localStorage.getItem('token');
      await axiosInstance.delete(`/api/appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointments(appointments.filter((appt) => (appt._id || appt.id) !== id));
      alert('Appointment canceled.');
    } catch (error) {
      alert('Failed to cancel appointment.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div style={{ maxWidth: '700px', margin: '50px auto' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>My Upcoming Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments scheduled.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {appointments.map((appt) => {
            const apptId = appt._id || appt.id;
            return (
              <li key={apptId} style={cardStyle}>
                <p><strong>Doctor:</strong> {appt.doctor}</p>
                <p><strong>Date:</strong> {appt.date}</p>
                <p><strong>Time:</strong> {appt.time}</p>
                <p><strong>Reason:</strong> {appt.reason}</p>
                <button onClick={() => deleteAppointment(apptId)} style={deleteBtnStyle}>
                  Cancel
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const cardStyle = {
  padding: '15px',
  marginBottom: '15px',
  border: '1px solid #ddd',
  borderRadius: '8px',
};

const deleteBtnStyle = {
  padding: '6px 12px',
  backgroundColor: '#dc3545',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  marginTop: '10px',
};

export default PatientAppointments;
