import api from "./api.js";

export const courseService = {
    getAllCourses: async function() {
        try {
            const response = await api.get('/courses');
            console.log(response)
            if(response.status === 200) {
                return response.data;
            }
        } catch(error) {
            console.error("Error fetching courses: ", error);
            return {success: false, message: error?.response?.data?.message || "failed to retrieve courses"}
        }
    }
}