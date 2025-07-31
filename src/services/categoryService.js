import api from './api.js'

export const categoryService = {
    getAllCategories: async function () {
        const response = await api.get('/categories');
        // console.log(response.data);
        try {
            if (response.status === 200) {
                return {success: true, data: response.data.data}
            } else {
                return {success: false, message: `Unexpected status code: ${response.status}`};
            }
        } catch (error) {
            console.error("Error fetching categories: ", error);
            return {
                success: error?.response?.data?.success || false,
                message: error?.response?.data?.message || "Failed to get categories"
            }

        }
    },
    createCategory: async function (category) {
        try {
            const response = await api.post('/categories', category);
            console.log(response);
            if (response.status === 201) {
                return response.data;
            } else {
                return {success: false, message: `Unexpected status code ${response.status}`}
            }
        } catch (err) {
            if (err.response.status === 422) {
                return {success: false, message: "Validation failed", errors: err?.response?.errors}
            }
            return {success: false, message: err?.response?.message}
        }
    },
    updateCategory: async function (categoryId, categoryData) {
        try {
            const response = await api.put(`/categories/${categoryId}`, categoryData);
            if (response.status === 200) {
                return response.data;
            } else {
                return {success: false, message: `Unexpected status code ${response.status}`}
            }
        } catch (err) {
            if (err.response.status === 422) {
                return {success: false, message: "Validation failed", errors: err?.response?.errors}
            }
            return {success: false, message: err?.response?.message}
        }
    },
    deleteCategory: async function (categoryId) {
        try {
            const response = await api.delete(`/categories/${categoryId}`);
            if (response.status === 200) {
                return response.data;
            } else {
                return {success: false, message: `Unexpected status code ${response.status}`}
            }
        } catch (err) {
            if (err.response.status === 422) {
                return {success: false, message: "Validation failed", errors: err?.response?.errors}
            }
            return {success: false, message: err?.response?.message}
        }
    }
}