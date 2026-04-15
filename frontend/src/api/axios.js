import axios from 'axios';

const API = axios.create({
  baseURL: 'https://imagestore-2.onrender.com',
});

// Har request mein token apne aap chala jaye, uske liye interceptor
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers['x-auth-token'] = token;
  }
  return req;
});

export default API;