import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:9000",
});

export default api;