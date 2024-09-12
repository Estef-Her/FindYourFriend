import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

function Logout({ setIsAuthenticated }) {
  const navigate = useNavigate();

  
  const handleLogout = async () => {
    await axios.post('http://localhost:4000/logout');
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Limpia el estado de autenticación
    setIsAuthenticated(false);

    // Redirige al usuario a la página de inicio de sesión o a otra página
    navigate('/login');
  };
  React.useEffect(() => {
    handleLogout();
  }, []);
}

export default Logout;
