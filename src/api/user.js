// src/api/user.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3505', // Ensure this matches your backend URL
});

export default api;
