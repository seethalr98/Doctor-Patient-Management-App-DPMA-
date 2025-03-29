import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';

const DoctorProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    specialization: '',
    email: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/api/doctors/profile'); // Adjust endpoint
        setProfile(res.data);
      } catch (err) {
        console.error('Error loading profile:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.put('/api/doctors/profile', profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Update failed', err);
      alert('Unauthorized. Please login again.');
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="text"
          name="specialization"
          value={profile.specialization}
          onChange={handleChange}
          placeholder="Specialization"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default DoctorProfile;
