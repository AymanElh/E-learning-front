import api from "./api.js";

export const enrollmentService = {
    getAllEnrollments: async function() {
        try {
            const response = await api.get('/enrollments');
            // console.log(response)
            if (response.status === 200) {
                return response.data;
            } else {
                return {success: false, message: `Unexpected status code ${response.status}`}
            }
        } catch (error) {
            console.error("Error fetching courses: ", error);
            return {success: false, message: "failed to retrieve enrollments"}
        }
    }
}