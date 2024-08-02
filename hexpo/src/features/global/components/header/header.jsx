import React from 'react';
import './header.css';

// Libs
import { useNavigate } from 'react-router-dom';

// Utils
import { useAuth } from '../../../../hooks/AuthProvider'

function Header() {
    const { logoutAction, user } = useAuth();

    return (
        <div className='header-container'>
            <img className='logo' src="https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/65c690616fadae3112571dff_Logo%20white%20hexpo.svg" alt="Hexpo Logo"/>
            <div className='flex flex-row'>
                <div className='label-container'>
                    <text className='font-light font-semibold font-medium'>{user.email}</text>
                </div>
                <div className='label-container'>
                    <img className="icon" src="https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/6639b31899c525332fee94c4_salida-de-emergencia.png" alt="Log Out" onClick={logoutAction}/>
                </div>
            </div>
        </div>
    );
}

export default Header;