import axios from "axios";
import {tokenService} from "./tokenService.js";

const api = axios.create({
    baseURL: "http://localhost:8888/api/v1",
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

api.interceptors.request.use((config) => {
    const token = tokenService.getToken();
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;