import React from 'react';
import { Link } from 'react-router-dom';
import fondo from '../images/fondo.jpg';
import fondo2 from '../images/fondo2.jpg';
import fondo3 from '../images/fondo3.jpg';
import fondo4 from '../images/fondo4.jpg';
import './Header.css';

const Header = ({ onBackgroundChange, isLoggedIn, handleLogout }) => {
  return (
    <header className="header">
      <nav>
        <ul>
          {isLoggedIn && (
            <>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/about">Quiénes Somos</Link></li>
              <li><Link to="/contact">Contacto</Link></li>
              <li><Link to="/other">Otra</Link></li>
              <li><button onClick={handleLogout}>Cerrar Sesión</button></li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li><Link to="/signup">Registrarse</Link></li>
              <li><Link to="/login">Iniciar Sesión</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
