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

export const CourseService = {
    getAllCourses: async function() {
        try {
            const response = await api.get('/courses');
            return response.data;
        } catch (error) {
            console.error('Error fetching courses', error);
            throw error;
        }
    },
    getCourseById: async function(id) {
        try {
            const response = await api.get(`/courses/${id}`);
            return response.data;
        } catch(error) {
            console.error(`Error fetching course with id ${id}`);
            throw error;
        }
    }
}

export default api;