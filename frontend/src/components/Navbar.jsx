import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const homePath = user?.role === 'doctor' ? '/doctor' : user?.role === 'patient' ? '/patient' : '/';

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to={homePath} className="text-2xl font-bold">DPMA</Link>
      <div>
        {user ? (
          <>
            <Link to={homePath} className="mr-4 hover:underline">Home</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4 hover:underline">Login</Link>
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
