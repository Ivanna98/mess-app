import axios from 'axios';

axios.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('auth');
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => Promise.reject(error),
);
export default axios;
