import api from "./api.js";
import {tokenService} from "./tokenService.js";

export const authService = {
    register: async function (userData) {
        try {
            const res = await api.post('/register', userData);

            if (res.status === 201) {
                const data = res.data;
                // console.log(data);
                tokenService.setToken(data.data.token.access_token);
                return {success: true, user: data.data.user};
            } else {
                return {success: false, error: data.message || "Registration failed"}
            }

        } catch (err) {
            console.error("Registration error: ", err);
            const errMessage = err.response?.data?.message || "Registration failed";
            return {success: false, error: errMessage};
        }
    },
    login: async function (credentials) {
        try {
            const res = await api.post('/login', credentials);
            if (res.status === 200) {
                const data = res.data;
                tokenService.setToken(data.token.access_token);
                return {success: true, message: "Login successfull"};
            } else {
                return {success: false, error: data.message || "Login failed"};
            }
        } catch (err) {
            return {success: false, error: err};
        }
    },
    logout: async function() {
        try {
            const token = tokenService.getToken('auth_token');
            const res = await api.post('/logout');
            tokenService.removeToken();
            return {success: true, message: "Logout successfully"}
        } catch (err) {
            console.error("Error logout: ", err);
            return {success: false}
        }
    }
}