import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout({ setIsAuthenticated }) {
  const navigate = useNavigate();

  
  const handleLogout = async () => {
    await axios.post('http://localhost:4000/logout');
    
    // Limpia cualquier estado relacionado con la autenticación
    setIsAuthenticated(false);

    // Redirige al usuario a la página de inicio de sesión o a otra página
    navigate('/');    
  };
}

export default Logout;
