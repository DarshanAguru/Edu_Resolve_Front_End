import axios  from 'axios';
import dotenv from 'dotenv'
import process from 'process'

dotenv.config()

const api = axios.create({
    baseURL: process.env.BASEURL,
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    }
});

export default api;