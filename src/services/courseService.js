import api from "./api.js";

export const courseService = {
    getAllCourses: async function () {
        try {
            const response = await api.get('/courses');
            console.log(response)
            if (response.status === 200) {
                return response.data;
            } else {
                return {success: false, message: `Unexpected status code ${response.status}`}
            }
        } catch (error) {
            console.error("Error fetching courses: ", error);
            return {success: false, message: error?.response?.data?.message || "failed to retrieve courses"}
        }
    },
    createCourse: async function (courseData) {
        try {
            const response = await api.post('/courses', courseData);
            console.log(response);
            if (response.status === 201) {
                return response.data;
            } else {
                return {success: false, message: `Unexpected status code: ${response.status}`}
            }
        } catch (error) {
            console.error("Error creating the course: ", error);
            // validation errors
            if (error.response && error.response.status === 422) {
                return {
                    success: false,
                    message: "Validation failed",
                    errors: error?.response?.data?.errors
                }
            }
            return {success: false, message: error?.response?.data?.message || "failed to create course"}
        }
    },
    getCourseById: async function (courseId) {
        try {
            const response = await api.get(`/courses/${courseId}`);
            // console.log(response);
            if(response.status === 200) {
                return response.data
            } else {
                return {success: false, message: `Unexpected status code: ${response.status}`}
            }
        } catch (error) {
            console.error("Error getting course: ", error);
            if(error.response && error.response.status === 404) {
                return {success: false, message: "Course not found"}
            }
            return {success: false, message: error?.response?.data?.message || "Error getting course"};
        }
    },
    updateCourse: async function(courseId, courseData) {
        try {
            console.log(courseId);
            const response = await api.put(`/courses/${courseId}`, courseData);
            if(response.status === 200) {
                return response.data;
            } else {
                return {success: false, message: `Unexpected status code: ${response.status}`}
            }
        } catch (error) {
            console.error("error updating course: ", error);
            if(error.response && error.response.status === 422) {
                return {
                    success: false,
                    message: "Validation failed",
                    errors: error?.response?.data?.errors
                }
            }
            return {success: false, message: "Failed to update course"};
        }
    },
    deleteCourse: async function(courseId) {
        try {
            const response = await api.delete(`/courses/${courseId}`);
            console.log(response);
            if(response.status === 200) {
                return response.data;
            } else {
                return {success: false, message: `Unexpected status code: ${response.status}`}
            }
        } catch (error) {
            console.error("error deleting course: ", error);
            if(error.response && error.response.status === 422) {
                return {
                    success: false,
                    message: "Validation failed",
                    errors: error?.response?.data?.errors
                }
            }
            return {success: false, message: error?.response?.message};
        }
    },
    getCourseEnrollments: async function(courseId) {
        try {
            const response = await api.get(`/courses/${courseId}/enrollments`);
            console.log(response);
            if(response.status === 200) {
                return response.data;
            } else {
                return {success: false, message: `Unexpected status code: ${response.status}`}
            }
        } catch (error) {
            console.error("Error fetching course enrollments: ", error);
            if(error.response && error.response.status === 404) {
                return {success: false, message: "Course not found"}
            }
            return {success: false, message: error?.response?.data?.message || "Failed to retrieve course enrollments"};
        }
    }
}
