import { Link } from 'react-router-dom';
import { routesConfig } from '../routes/Router';

const Navbar = () => {
  const routesToShow = [
    { path: '/', name: 'INICIO' },
    { path: '/about', name: 'SOBRE NOSOTROS' },
    { path: '/products', name: 'CATALOGO' },
    { path: '/contact', name: 'CONTACTO' },
    { path: '/login', name: 'INICIO SESION' },
  ];
  return (
    <ul className="main-menu" id="main-menu">
    {routesToShow.map((route) => {
      // Busca la ruta correspondiente en routesConfig para obtener la URL
      const matchedRoute = routesConfig.find((config) => config.path === route.path);

      if (matchedRoute) {
        return (
          <li key={matchedRoute.path} className="main-menu-item">
            <Link to={matchedRoute.path} className="main-menu-link">{route.name}</Link>
          </li>
        );
      }

      return null; // Si no se encuentra la ruta, no se muestra el enlace
    })}
  </ul>
  );
};

export default Navbar;