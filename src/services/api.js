import axios from 'axios';

const API_URL = "http://localhost:8080/api/v1";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpL3YxL2xvZ2luIiwiaWF0IjoxNzQ0MzEwNDc4LCJleHAiOjE3NDQzMTQwNzgsIm5iZiI6MTc0NDMxMDQ3OCwianRpIjoiaWZHcWhqaVJYNWIxRXFGSCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.NHa5ZB0jY6s-P2Hx5AD2ahgG7u91IqbW1oaP4MTKL9c`
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
    },
    createCourse: async function(courseData) {
        try {
            const response = await api.post('/courses', courseData);
            console.log(response);
            return response.data;
        } catch(error) {
            console.error("Error creating the course: ", error);
            throw error;
        }
    },
    updateCourse: async (id, courseData) => {
        try {
            const response = await api.put(`/courses/${id}`, courseData);
            return response.data;
        } catch (error) {
            console.error(`Error updating course with id ${id}:`, error);
            throw error;
        }
    },
    deleteCourse: async (id) => {
        try {
            const response = await api.delete(`/courses/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting course with id ${id}:`, error);
            throw error;
        }
    }
}

export const TagService = {
    getAllTags: async () => {
        try {
            const response = await api.get('/tags');
            return response.data;
        } catch (error) {
            console.error('Error fetching tags:', error);
            throw error;
        }
    }
};

export default api;