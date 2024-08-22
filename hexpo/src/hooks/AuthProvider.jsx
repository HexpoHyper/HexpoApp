import { useContext, createContext, useState, useEffect } from 'react';
import api from '../features/global/utils/api/Routing'; 

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
    const [profile, setProfile] = useState(() => JSON.parse(localStorage.getItem('profile')));

    const loginAction = async (data) => {
        try {
            const response = await fetch(api.local.base + '/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
    
                if (!response.ok) {
                const errorData = await response.json(); 
                throw new Error(errorData.message || 'Error al iniciar sesión');
            }
    
            const responseData = await response.json();
    
            if (responseData && responseData.data) {
                setUser(responseData.data.user);
                localStorage.setItem('user', JSON.stringify(responseData.data.user));
                localStorage.setItem('profile', JSON.stringify(responseData.data.profile));
                return true;
            } else {
                throw new Error('Hubo un error en el servidor, por favor intenta de nuevo');
            }
        } catch (error) {
            console.error('Login action error:', error.message);
            if (error.message === 'Failed to fetch') {
                throw new Error('Error de conexión, por favor intenta de nuevo');
            }
            if (error.message === 'Unauthorized' || error.message === 'Invalid login credentials') {
                throw new Error('Correo o contraseña incorrectos');
            }
            if (error.message === 'Error al iniciar sesión') {
                throw new Error('Correo o contraseña incorrectos');
            }
            if (error.message === 'Hubo un error en el servidor, por favor intenta de nuevo') {
                throw new Error('Hubo un error en el servidor, por favor intenta de nuevo');
            }
            if (error.message === 'Cannot read properties of null (reading \'access_token\')') {
                throw new Error('');
            }
            throw error;
        }
    };
    

    const SignUpAction = async (data) => {
        try {
            const response = await fetch(api.prod.base + '/auth/signUp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            
            if (responseData && responseData.data) {
                setUser(responseData.data.user);
                setProfile(responseData.data.profile);
                localStorage.setItem('user', JSON.stringify(responseData.data.user));
                return true;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const logoutAction = () => {
        setUser(null);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ SignUpAction, loginAction, logoutAction, user, profile }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
