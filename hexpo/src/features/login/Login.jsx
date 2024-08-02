import {React, useState} from 'react';

// Styles
import "./Login.css";

// Components
import TextInput from "../global/components/textInput/TextInput";

// Hooks
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('This is an error!');

    const emailOnChange = (e) => {
        setEmail(e.target.value);
    }
    const passwordOnChange = (e) => {
        setPassword(e.target.value);
    }
    
    const { loginAction } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = {
            email: email,
            password: password
        }
        
        try {
            const isLoggedIn = await loginAction(credentials);
            if (isLoggedIn) {
                navigate('/empresas'); 
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
        
 
    }

    return (
        <div className="login-container">
            <div className='login-form-container'>
                <img className='trademark margin-bottom-1' src="https://cdn.prod.website-files.com/65384f64fc0a1608e6828a1c/6556838341b0589afb8f4764_LogoExpo.svg"/>
                <text className='font-gigantic font-dark font-semibold'>¡Bienvenido de vuelta!</text>
                <text className='font-indigo font-medium'>Hyper simplifica tu presencia en línea con visibilidad de más de 10,000 empresas buscando proveedores</text>
                <hr className='margin-bottom-1'/>

                <form onSubmit={handleSubmit} className='flex flex-column gap-1'>
                    <div>
                        <text className='font-disabled font-medium margin-1'>Correo</text>
                        <TextInput key="email" name="email" placeholder="hexpo@hexpo.mx" value={email} onChange={(e) => emailOnChange(e)}/>
                    </div>
                    <div>
                        <text className='font-disabled font-medium margin-1'>Contraseña</text>
                        <TextInput key="password" name="password" placeholder="********" type="password" value={password} onChange={(e) => passwordOnChange(e)}/>
                    </div>
                    {error && <text className='font-semibold font-small font-error'>{error}</text>}
                    <input type='submit' className='default-button'/>
                </form>
            </div>
            <div className='login-hero-container'>
                <img src="https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/655683fa381ff7146fd2b6f5_Cohete.svg"/>
            </div>
        </div>
    );
};

export default Login;
