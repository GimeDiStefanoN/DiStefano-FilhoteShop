import { useNavigate} from 'react-router-dom';
import { userStore } from '../stores/store';
import { useState, useEffect } from 'react';

const Logout = () => {
    const setUser = userStore((state) => state.setUser);
  const navigate = useNavigate();
  const [cerrarSesion, setcerrarSesion] = useState(false);

  useEffect(() => {
    if (cerrarSesion) {
      setUser(null);
      navigate('/login');
    }
  }, [cerrarSesion]);

  if (!cerrarSesion) {
    setcerrarSesion(true); 
  }

  return (
    <>
        {alert('Sesión Finalizada')}
    </>
  )
}

export default Logout