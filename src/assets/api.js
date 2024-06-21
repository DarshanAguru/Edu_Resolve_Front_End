import axios  from 'axios';
// import  axiosRetry  from 'axios-retry';



const api = axios.create({
    // baseURL: 'https://appbackendserver.onrender.com',
    baseURL: "http://localhost:9000",
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    }
});
// axiosRetry(api , { retries: 1, retryDelay: axiosRetry.exponentialDelay})

export default api;