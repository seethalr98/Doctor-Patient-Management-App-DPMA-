import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [appointmentCount, setAppointmentCount] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const homePath = user?.role === 'doctor' ? '/doctor' : user?.role === 'patient' ? '/patient' : '/';

  useEffect(() => {
    const fetchDoctorAppointments = async () => {
      if (user?.role === 'doctor' && user?.token) {
        try {
          const response = await axiosInstance.get('/api/appointments/doctor', {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setAppointmentCount(response.data.length || 0);
        } catch (error) {
          console.error('Failed to fetch appointments:', error);
        }
      }
    };

    fetchDoctorAppointments();
  }, [user]);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to={homePath} className="text-2xl font-bold">DPMA</Link>

      <div className="flex items-center gap-6">
        {user && (
          <>
            <Link to={homePath} className="hover:underline">Home</Link>

            {/* 🔔 Notification Bell for Doctor */}
            {user.role === 'doctor' && (
              <div
                onClick={() => navigate('/doctor/appointments')}
                className="relative cursor-pointer"
                title="View Appointments"
              >
                <span className="text-2xl">🔔</span>
                {appointmentCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                    {appointmentCount}
                  </span>
                )}
              </div>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        )}

        {!user && (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link
              to="/register"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;