import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        console.log("call");
        const token = localStorage.getItem('token');
        //const res = await axiosInstance.get('/api/doctors/appointments'); // Adjust endpoint

        const res = await axiosInstance.get('/api/doctors/appointments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


        console.log(res.data);
        setAppointments(res.data);
      } catch (err) {
        console.error('Error fetching appointments:', err);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li key={appt._id} className="p-4 border rounded shadow">
              <p><strong>Patient:</strong> {appt.patientName}</p>
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