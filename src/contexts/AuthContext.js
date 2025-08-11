import {createContext, useContext, useEffect, useState} from "react";
import {tokenService} from "../services/tokenService.js";

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
                    const response = await api.get('/api/v1/profile', {
                        'Authorization': `Bearer ${storedToken}`
                    })

                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                        setToken(storedToken);
                    } else {
                        logout();
                    }
                } catch (error) {
                    console.error("Auth check failed:", error);
                    logout();
                }

                setLoading(false);
            }
        }
        checkAuth();
    }, []);

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        tokenService.setToken(token);
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