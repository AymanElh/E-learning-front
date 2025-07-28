import api from './api.js'
export const categoryService = {
    getAllCategories: async function() {
        const response = await api.get('/categories');
        // console.log(response.data);
        try {
            if(response.status === 200) {
                return {success: true, data: response.data.data}
            } else {
                return {success: false, message: `Unexpected status code: ${response.status}`};
            }
        } catch(error) {
            console.error("Error fetching categories: ", error);
            return {success: error?.response?.data?.success || false, message: error?.response?.data?.message || "Failed to get categories"}

        }
    }
}