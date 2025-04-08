import axios from 'axios';

const API_URL = "http://localhost:8080/api/v1";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});


export const CategoryService = {
    getAllCategories: async() => {
        try {
            const response = await api.get('/categories');
            // console.log("Response: ", response.data);
            return response.data;
        } catch(error) {
            console.log("Error fetching categories: ", error);
            throw error;
        }
    }
}

export default api;