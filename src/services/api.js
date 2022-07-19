import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:7297",
});

export default api;