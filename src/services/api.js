import axios from 'axios';

const api = axios.create({
    baseURL: 'https://back-event-management.onrender.com/api', // URL base del backend
});

export default api;
