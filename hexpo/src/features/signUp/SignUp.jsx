import {React, useState} from 'react';

// Styles
import "./SignUp.css";

// Components
import TextInput from "../global/components/textInput/TextInput";

// Hooks
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const { SignUpAction, user } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordVerification, setPasswordVerification] = useState('');

    const [requested, setRequested] = useState(false);

    const emailOnChange = (e) => {
        setEmail(e.target.value);
    }
    const passwordOnChange = (e) => {
        setPassword(e.target.value);
    }
    const nameOnChange = (e) => {
        setName(e.target.value);
    }

    const passwordVerificationOnChange = (e) => {
        setPasswordVerification(e.target.value);
    }

    const validation = () => {
        if (email === '' || password === '') {
            setError('Por favor, llena todos los campos');
            return false;
        }
        if (!email.includes('@')) {
            setError('Por favor, ingresa un correo válido');
            return false;
        }
        if (password != passwordVerification) {
            setError('Las contraseñas no coinciden');
            return false;
        }
        if (name === '') {
            setError('Por favor, ingresa tu nombre');
            return false;
        }
        return true;
    }    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestBody = {
            email: email,
            password: password,
            name: name
        }
        if(!validation()) return;
        
        try {
            await SignUpAction(requestBody).then(() => {
                setRequested(true);
            });
        } catch (error) {
            if (error.message === "Cannot read properties of null (reading 'access_token')") {
                return
            }
            setError(error.message);
        }
    }

    if(requested) {
        return(
        <div className='SignUp-container'>
            <div className='SignUp-form-container'>
                <img className='trademark margin-bottom-1' src="https://cdn.prod.website-files.com/65384f64fc0a1608e6828a1c/6556838341b0589afb8f4764_LogoExpo.svg"/>
                <text className='font-large font-semibold font-dark'>Confirma tu cuenta</text>
                <text className='font-indigo font-medium'>Acabamos de enviarte un mensaje de confirmación a tu correo para validar tu cuenta.</text>
            </div>
            <div className='SignUp-hero-container'>
                <img src="https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/655646d1da7855f9f8df933f_Capa_1.svg"/>
            </div>
        </div>
        
    )}

    return (
        <div className="SignUp-container">
            <div className='SignUp-form-container'>
                <img className='trademark margin-bottom-1' src="https://cdn.prod.website-files.com/65384f64fc0a1608e6828a1c/6556838341b0589afb8f4764_LogoExpo.svg"/>
                <text className='font-gigantic font-dark font-semibold'>Crea tu cuenta</text>
                <text className='font-indigo font-medium'>Hyper simplifica tu presencia en línea con visibilidad de más de 10,000 empresas buscando proveedores</text>
                <hr className='margin-bottom-1'/>

                <form onSubmit={handleSubmit} className='flex flex-column gap-1'>
                    <div>
                        <text className='font-disabled font-medium margin-1'>Nombre</text>
                        <TextInput key="name" name="name" placeholder="" value={name} onChange={(e) => nameOnChange(e)}/>
                    </div>
                    <div>
                        <text className='font-disabled font-medium margin-1'>Correo</text>
                        <TextInput key="email" name="email" placeholder="hexpo@hexpo.mx" value={email} onChange={(e) => emailOnChange(e)}/>
                    </div>
                    <div>
                        <text className='font-disabled font-medium margin-1'>Contraseña</text>
                        <TextInput key="password" name="password" placeholder="********" type="password" value={password} onChange={(e) => passwordOnChange(e)}/>
                    </div>
                    <div>
                        <text className='font-disabled font-medium margin-1'>Confirmar contraseña</text>
                        <TextInput key="passwordVerification" name="passwordVerification" placeholder="********" type="password" value={passwordVerification} onChange={(e) => passwordVerificationOnChange(e)}/>
                    </div>
                    {error && <text className={'font-semibold font-small font-error'}>{error}</text>}
                    {error.message && <text className={'font-semibold font-small font-error'}>{error.message}</text>}
                    <input type='submit' className='default-button'/>
                    <div>
                        <text className='font-indigo font-medium'>¿Ya tienes una cuenta? <a href='/login'>Inicia sesión</a></text>
                    </div>
                </form>
            </div>
            <div className='SignUp-hero-container'>
                <img src="https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/655646d1da7855f9f8df933f_Capa_1.svg"/>
            </div>
        </div>
    );
};

export default SignUp;
