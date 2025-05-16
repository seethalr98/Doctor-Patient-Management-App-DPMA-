import axios from 'axios';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  // baseURL: 'http://13.211.170.208:5001',
  baseURL: 'http://localhost:5001',
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});


export default axiosInstance;
