import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const homePath = user?.role === 'doctor' ? '/doctor' : user?.role === 'patient' ? '/patient' : '/';

  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (user?.role === 'doctor' && user?.token) {
        try {
          const res = await axiosInstance.get('/api/appointments/unread-count', {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setUnreadCount(res.data.count || 0);
        } catch (error) {
          console.error('Failed to fetch unread count:', error);
        }
      }
    };

    fetchUnreadCount();
  }, [user]);

  const handleBellClick = async () => {
    if (user?.role === 'doctor' && user?.token) {
      try {
        // Mark all as read before redirecting
        await axiosInstance.put('/api/appointments/mark-read', null, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUnreadCount(0); // reset locally
        navigate('/doctor/appointments');
      } catch (error) {
        console.error('Failed to mark appointments as read:', error);
        navigate('/doctor/appointments'); // fallback navigation
      }
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to={homePath} className="text-2xl font-bold">DPMA</Link>

      <div className="flex items-center gap-6">
        {user && (
          <>
            <Link to={homePath} className="hover:underline">Home</Link>

            {user.role === 'doctor' && (
              <div
                onClick={handleBellClick}
                className="relative cursor-pointer"
                title="View Appointments"
              >
                <span className="text-2xl">🔔</span>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                    {unreadCount}
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