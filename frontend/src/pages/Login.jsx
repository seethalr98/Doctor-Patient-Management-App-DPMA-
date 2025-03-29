import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('name', response.data.name);
      login(response.data);

      if (response.data.role === 'doctor') {
        navigate('/doctor');
      } else {
        navigate('/patient');
      }
    } catch (error) {
      alert('Login failed. Please try again.');
      console.error(error);
    }
  };
  


//richu

  // const handleSubmit = async (e) => {
  //   console.log("Hello");
  //   e.preventDefault();
  //   try {
  //     const response = await axiosInstance.post('/api/auth/login', formData);
  //     login(response.data);
  //     console.log(response.data);
  //     if (response.data.role === 'doctor') {
  //             navigate('/doctor');
  //           } else {
  //             navigate('/patient');
  //           }
  //   } catch (error) {
  //     alert('Login failed. Please try again.');
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axiosInstance.post('/api/auth/login', formData);
  //     const { token, role } = res.data;
  //     console.write("role");
  //     console.write(role);
  //     localStorage.setItem('token', token);
  //     localStorage.setItem('role', role);
  //     console.write("role");
  //     console.write(role);
  
  //     if (role === 'doctor') {
  //       navigate('/doctor');
  //     } else {
  //       navigate('/patient');
  //     }
  //   } catch (error) {
  //     alert('Login failed. Please try again.');
  //   }
  // };
  

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
