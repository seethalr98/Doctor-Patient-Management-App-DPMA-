import axios from 'axios';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001',
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

// richu
// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:9080', // local
//   //baseURL: 'http://3.26.96.188:5001', // live
//   headers: { 'Content-Type': 'application/json' },
// });

export default axiosInstance;
