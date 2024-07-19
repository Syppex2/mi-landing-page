// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Other from './components/Other';
import Signup from './components/Signup';
import Login from './components/Login';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import fondo from './images/fondo.jpg';
import fondo2 from './images/fondo2.jpg';
import fondo3 from './images/fondo3.jpg';
import fondo4 from './images/fondo4.jpg';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import { MusicProvider } from './MusicContext'; // Importar el contexto

function App() {
  const [backgroundImage, setBackgroundImage] = useState(fondo);
  const [accounts, setAccounts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleBackgroundChange = (image) => {
    setBackgroundImage(image);
    setShowDropdown(false);
  };

  const handleSignup = (newAccount) => {
    setAccounts([...accounts, newAccount]);
    alert('Cuenta creada exitosamente');
  };

  const handleLogin = (loginData) => {
    const accountExists = accounts.some(
      account => account.email === loginData.email && account.password === loginData.password
    );

    if (accountExists) {
      setIsLoggedIn(true);
      alert('Inicio de sesión exitoso');
      navigate('/');
    } else {
      alert('Correo electrónico o contraseña incorrectos');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('Sesión cerrada');
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Header
        onBackgroundChange={handleBackgroundChange}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />
      <div className="background-selector">
        <button className="dropdown-btn" onClick={() => setShowDropdown(!showDropdown)}>
          Seleccionar Fondo
        </button>
        {showDropdown && (
          <div className="dropdown-content">
            <button onClick={() => handleBackgroundChange(fondo)}>Fondo 1</button>
            <button onClick={() => handleBackgroundChange(fondo2)}>Fondo 2</button>
            <button onClick={() => handleBackgroundChange(fondo3)}>Fondo 3</button>
            <button onClick={() => handleBackgroundChange(fondo4)}>Fondo 4</button>
          </div>
        )}
      </div>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/other"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Other />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </main>
      <MusicPlayer />
      <Footer />
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <MusicProvider> {/* Envolver el componente App con MusicProvider */}
        <App />
      </MusicProvider>
    </Router>
  );
}

export default AppWrapper;
