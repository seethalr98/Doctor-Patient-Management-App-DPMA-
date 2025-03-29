import { useNavigate } from 'react-router-dom';

const DoctorHome = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome, Doctor 👨‍⚕️</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* View Appointments */}
        <div
          onClick={() => navigate('/doctor/appointments')}
          className="bg-blue-100 hover:bg-blue-200 cursor-pointer p-6 rounded-lg shadow text-center"
        >
          <h2 className="text-xl font-semibold mb-2">Appointments</h2>
          <p className="text-sm text-gray-600">View and manage your upcoming appointments.</p>
        </div>

        {/* Doctor Profile */}
        <div
          onClick={() => navigate('/doctor/profile')}
          className="bg-green-100 hover:bg-green-200 cursor-pointer p-6 rounded-lg shadow text-center"
        >
          <h2 className="text-xl font-semibold mb-2">My Profile</h2>
          <p className="text-sm text-gray-600">View and edit your doctor profile.</p>
        </div>

        {/* Medical Records */}
        <div
          onClick={() => navigate('/doctor/records')}
          className="bg-yellow-100 hover:bg-yellow-200 cursor-pointer p-6 rounded-lg shadow text-center"
        >
          <h2 className="text-xl font-semibold mb-2">Medical Records</h2>
          <p className="text-sm text-gray-600">Access and update patient medical records.</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorHome;
