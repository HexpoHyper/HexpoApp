import { useContext, createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    const loginAction = async (data) => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            
            if (responseData) {
                setUser(responseData.data.user);
                setToken(responseData.data.session.access_token);
                localStorage.setItem('user', JSON.stringify(responseData.data.user));
                localStorage.setItem('token', responseData.data.session.access_token);
                return true;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const logoutAction = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ loginAction, logoutAction, user, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
