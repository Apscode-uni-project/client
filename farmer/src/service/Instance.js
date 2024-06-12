import axios from 'axios';

const Instance = axios.create({
    baseURL: 'http://localhost:5005',
    withCredentials: true,
});

export default Instance;