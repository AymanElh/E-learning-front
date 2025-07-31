import api from "./api.js";
import {tokenService} from "./tokenService.js";

export const authService = {
    register: async function (userData) {
        try {
            const res = await api.post('/register', userData);

            if (res.status === 201) {
                const data = res.data;
                console.log(data);
                tokenService.setToken(data.data.token.access_token);

                this.setUser(data.data.user)

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
            console.log(res);
            if (res.status === 200) {
                const data = res.data;
                console.log("data: ", data);
                tokenService.setToken(data.data.token.access_token);

                if (data.data.user) {
                    this.setUser(data.data.user);
                }

                return {success: true, message: "Login successfully"};
            } else {
                return {success: false, error: data.message || "Login failed"};
            }
        } catch (err) {
            console.log(err);
            const errMessage = err?.response?.data?.message || "Login failed";
            return {success: false, error: errMessage};
        }
    },
    logout: async function () {
        try {
            const token = tokenService.getToken();
            const res = await api.post('/logout');
            tokenService.removeToken();
            return {success: true, message: "Logout successfully"}
        } catch (err) {
            console.error("Error logout: ", err);
            return {success: false}
        }
    },
    getCurrentUser: function () {
        try {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                return JSON.parse(userStr);
            }
            return null;
        } catch (err) {
            console.error('Error parsing user data from localStorage:', error);
            return null;

        }
    },
    setUser: function (user) {
        try {
            localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            console.error('Error storing user data:', error);
        }
    },
    removeUser: function () {
        localStorage.removeItem('user');
    },
    isAuthenticated: function () {
        const token = tokenService.getToken();
        const user = this.getCurrentUser();
        return !!(token && user);
    },
}