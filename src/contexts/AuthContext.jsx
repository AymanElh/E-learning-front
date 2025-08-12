import {createContext, useContext, useEffect, useState} from "react";
import {tokenService} from "../services/tokenService.js";
import api from '../services/api.js'

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must used within an auth provider");
    }
    return context;
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(tokenService.getToken());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async function () {
            const storedToken = tokenService.getToken();
            const storedUser = localStorage.getItem("user");

            if (storedUser && storedToken) {
                try {
                    // Parse the stored user data
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                    setToken(storedToken);

                    // Try to validate the token with the server
                    const response = await api.get('/profile', {
                        headers: {
                            'Authorization': `Bearer ${storedToken}`
                        }
                    });

                    if (response.status === 200) {
                        // Update user data with fresh data from server
                        setUser(response.data);
                    }
                    // If the API call fails, we still keep the user logged in
                    // The token might still be valid, just server is unreachable
                } catch (error) {
                    console.error("Auth check failed:", error);
                    // Don't logout automatically on API failure
                    // Only logout if it's a 401 (unauthorized) error
                    if (error.response && error.response.status === 401) {
                        logout();
                    } else {
                        // For other errors (network, 500, etc.), keep user logged in
                        // but use the stored user data
                        try {
                            const parsedUser = JSON.parse(storedUser);
                            setUser(parsedUser);
                            setToken(storedToken);
                        } catch (parseError) {
                            console.error("Failed to parse stored user:", parseError);
                            logout();
                        }
                    }
                }
            }

            setLoading(false);
        }
        checkAuth();
    }, []);

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        tokenService.setToken(authToken);
        localStorage.setItem('user', JSON.stringify(userData));
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        tokenService.removeToken();
        localStorage.removeItem('user');
    }

    const isAuthenticated = () => {
        return !!(user && token);
    }

    const value = {
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}