import React, { useEffect, useState } from 'react';
import './header.css';

// Libs
import { useNavigate } from 'react-router-dom';

// Utils
import { useAuth } from '../../../../hooks/AuthProvider'

function Header() {
    const { logoutAction, user } = useAuth();
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (user && user.email) {
            setEmail(user.email);
        } else {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                const parsedUser = JSON.parse(savedUser);
                setEmail(parsedUser.email);
            }
        }
    }, [user]);

    return (
        <div className='header-container'>
            <img 
                className='logo' 
                src="https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/65c690616fadae3112571dff_Logo%20white%20hexpo.svg" 
                alt="Hexpo Logo"
            />
            <div className='flex flex-row'>
                <div className='label-container'>
                    <span className='font-light font-semibold font-medium'>{email}</span>
                </div>
                <div className='label-container'>
                    <img 
                        className="icon" 
                        src="https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/6639b31899c525332fee94c4_salida-de-emergencia.png" 
                        alt="Log Out" 
                        onClick={logoutAction}
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
