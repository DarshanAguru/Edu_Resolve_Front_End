import axios  from 'axios';



const api = axios.create({
    baseURL: 'https://appbackendserver.onrender.com',
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    }
});

export default api;