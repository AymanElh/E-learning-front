import api from "./api.js";

export const tagService = {
    getAllTags: async function () {
        try {
            const response = await api.get('/tags');
            if (response.status === 200) {
                return response.data;
            } else {
                return {success: false, message: `Unexpected status code ${response.status}`}
            }
        } catch (err) {
            console.error("Failed to fetch tags: ", err);
            return {success: false, message: "Failed to fetch tags"}
        }
    },
    createTag: async function (tag) {
        try {
            const response = await api.post('/tags', tag);
            if (response.status === 201) {
                return response.data;
            } else {
                return {success: false, message: `Unexpected status code ${response.status}`}
            }
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 422) {
                return {
                    success: false,
                    message: "Validation failed",
                    errors: err.response?.errors
                }
            }

            return {success: false, message: "Failed to create tag"}
        }
    },
    updateTag: async function (tagId, tag) {
        try {
            const response = await api.put(`/tags/${tagId}`, tag);
            if (response.status === 200) {
                return response.data;
            } else {
                return {success: false, message: `Unexpected status code ${response.status}`}
            }
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 422) {
                return {
                    success: false,
                    message: "Validation failed",
                    errors: err.response?.errors
                }
            }

            return {success: false, message: "Failed to update tag"}
        }
    },
    deleteTag: async function (tagId) {
        try {
            const response = await api.delete(`/tags/${tagId}`);
            if (response.status === 200) {
                return response.data;
            } else {
                return {success: false, message: `Unexpected status code ${response.status}`}
            }
        } catch (err) {
            console.error(err);
            return {success: false, message: "Failed to delete tag"}
        }
    }
}