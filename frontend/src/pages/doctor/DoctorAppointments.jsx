import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [sortBy, setSortBy] = useState('date');

  const fetchAppointments = async (sortValue) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axiosInstance.get(`/api/appointments/doctor?sort=${sortValue}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  useEffect(() => {
    fetchAppointments(sortBy);
  }, [sortBy]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Appointments</h2>

        {/* 🔽 Sorting Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="date">Sort by Date</option>
          <option value="time">Sort by Time</option>
          <option value="patient">Sort by Patient Name</option>
        </select>
      </div>

      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li key={appt.id} className="p-4 border rounded shadow">
              <p><strong>Patient:</strong> {appt.patient?.name || 'Unknown'}</p>
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Time:</strong> {appt.time}</p>
              <p><strong>Reason:</strong> {appt.reason}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorAppointments;
