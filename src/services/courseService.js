import api from "./api.js";

export const courseService = {
    getAllCourses: async function() {
        try {
            const response = await api.get('/courses');
            console.log(response)
            if(response.status === 200) {
                return response.data;
            } else {
                return {success: false, message: `Unexpected status code ${response.status}`}
            }
        } catch(error) {
            console.error("Error fetching courses: ", error);
            return {success: false, message: error?.response?.data?.message || "failed to retrieve courses"}
        }
    },
    createCourse: async function (courseData) {
        try {
            const response = await api.post('/courses', courseData);
            console.log(response);
            if(response.status === 201) {
                return response.data;
            } else {
                return {success: false, message: `Unexpected status code: ${response.status}`}
            }
        } catch(error) {
            console.error("Error creating the course: ", error);
            // validation errors
            if(error.response && error.response.status === 422) {
                return {
                    success: false,
                    message: "Validation failed",
                    errors: error?.response?.data?.errors
                }
            }
            return {success: false, message: error?.response?.data?.message || "failed to create course"}
        }
    }
}