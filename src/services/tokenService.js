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
        return !!sessionStorage.getItem('auth_token');
    }
}