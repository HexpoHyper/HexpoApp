import { useContext, createContext, useState, useEffect } from 'react';
import useEnterpriseData from './useEnterpriseData';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [refresh, setRefresh] = useState(false);
    const [enterpriseData, setEnterpriseData] = useState(null);

    const { data, loading, error } = useEnterpriseData(userId, refresh);

    const handleRefresh = () => {
        setRefresh(prev => !prev); 
    };    

    useEffect(() => {
        if (data) {
            setEnterpriseData(data);
        }
    }, [data]);

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
            
            if (responseData && responseData.data) {
                setUser(responseData.data.user);
                setUserId(responseData.data.user.id);
                setToken(responseData.data.session.access_token);
                localStorage.setItem('user', JSON.stringify(responseData.data.user));
                localStorage.setItem('token', responseData.data.session.access_token);
                handleRefresh(); 
                return true;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const SignUpAction = async (data) => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/signUp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            
            if (responseData && responseData.data) {
                setUser(responseData.data.user);
                setUserId(responseData.data.user.id);
                setToken(responseData.data.session.access_token);
                localStorage.setItem('user', JSON.stringify(responseData.data.user));
                localStorage.setItem('token', responseData.data.session.access_token);
                handleRefresh();
                return true;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const logoutAction = () => {
        setUser(null);
        setUserId(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setRefresh(false);
    };

    const updateEnterpriseData = (newData) => {
        setEnterpriseData(prevData => {
            return { ...prevData, ...newData };
        });
    };

    return (
        <AuthContext.Provider value={{ SignUpAction, loginAction, logoutAction, updateEnterpriseData, user, token, data, loading, error, handleRefresh }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
