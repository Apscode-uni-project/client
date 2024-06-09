import axios from 'axios';

const Instance = axios.create({
    baseURL: 'http://localhost:5005',
    timeout: 1000,
    withCredentials: true,
});

export default Instance;