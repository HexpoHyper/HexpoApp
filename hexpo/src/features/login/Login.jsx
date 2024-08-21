import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../global/components/textInput/TextInput';
import { useAuth } from '../../hooks/AuthProvider';
import { useEnterprise } from '../../hooks/EnterpriseProvider';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { loginAction } = useAuth();
  const { enterpriseList, setEnterpriseList } = useEnterprise();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const redirectTo = () => {
    if (enterpriseList.length > 0) {
      navigate('/empresas');
    } else {
      navigate('/empresas/registrar');
    }
  };

  const emailOnChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const validation = () => {
    if (email === '' || password === '') {
      setError('Por favor, llena todos los campos');
      return false;
    }
    if (!email.includes('@')) {
      setError('Por favor, ingresa un correo válido');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation()) return;

    const credentials = { email, password };
    try {
      const isLoggedIn = await loginAction(credentials);
      if (isLoggedIn) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const checkEnterpriseList = async () => {
      while (!enterpriseList) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      redirectTo();
    };

    if (isLoggedIn) {
      checkEnterpriseList();
    }
  }, [isLoggedIn, enterpriseList, navigate, redirectTo]);

  return (
    <div className="login-container">
      <div className="login-form-container">
        <img
          className="trademark margin-bottom-1"
          src="https://cdn.prod.website-files.com/65384f64fc0a1608e6828a1c/6556838341b0589afb8f4764_LogoExpo.svg"
          alt="Logo"
        />
        <text className="font-gigantic font-dark font-semibold">¡Bienvenido de vuelta!</text>
        <text className="font-indigo font-medium">
          Hyper simplifica tu presencia en línea con visibilidad de más de 10,000 empresas buscando proveedores
        </text>
        <hr className="margin-bottom-1" />
        <form onSubmit={handleSubmit} className="flex flex-column gap-1">
          <div>
            <text className="font-disabled font-medium margin-1">Correo</text>
            <TextInput
              key="email"
              name="email"
              placeholder="hexpo@hexpo.mx"
              value={email}
              onChange={emailOnChange}
            />
          </div>
          <div>
            <text className="font-disabled font-medium margin-1">Contraseña</text>
            <TextInput
              key="password"
              name="password"
              placeholder="********"
              type="password"
              value={password}
              onChange={passwordOnChange}
            />
          </div>
          {error && <text className="font-semibold font-small font-error">{error}</text>}
          <input type="submit" className="default-button" />
        </form>
        <div className="margin-1">
          <text className="font-medium font-indigo">
            ¿Aún no tienes cuenta? <a href="/registro" className="font-small font-semibold">Regístrate</a>
          </text>
        </div>
        <div className="margin-1">
          <text className="font-medium font-indigo">
            ¿Olvidaste tu contraseña? <a href="/recovery" className="font-small font-semibold">Recuperar contraseña</a>
          </text>
        </div>
        <div className="margin-1">
          <text className="font-small font-disabled">
            Al enviar reconoce que ha leído y acepta nuestra <a href="/" className="font-indigo">política de privacidad</a> y nuestros{' '}
            <a href="/" className="font-indigo">términos de servicio.</a>
          </text>
        </div>
      </div>
      <div className="login-hero-container">
        <img src="https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/655683fa381ff7146fd2b6f5_Cohete.svg" alt="Rocket" />
      </div>
    </div>
  );
};

export default Login;
