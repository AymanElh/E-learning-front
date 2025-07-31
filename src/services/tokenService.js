import {jwtDecode} from "jwt-decode";

export const tokenService = {
    getToken: () => {
        return sessionStorage.getItem('auth_token');
    },
    setToken: (token) => {
        return sessionStorage.setItem('auth_token', token);
    },
    removeToken: () => {
        sessionStorage.removeItem('auth_token');
    },
    isAuthenticated: () => {
        const token = sessionStorage.getItem('auth_token');
        if(!token) return null;

        try {
            const {exp} = jwtDecode(token);
            console.log(exp);
            if(!exp) return false;

            const now = Date.now() / 1000;
            return exp > now
        } catch (err) {
            return false;
        }
    }
}