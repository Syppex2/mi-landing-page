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
import { MusicProvider } from './MusicContext';

function App() {
  const [backgroundImage, setBackgroundImage] = useState(fondo);
  const [accounts, setAccounts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const backgrounds = [
    { value: fondo, label: 'Fondo 1' },
    { value: fondo2, label: 'Fondo 2' },
    { value: fondo3, label: 'Fondo 3' },
    { value: fondo4, label: 'Fondo 4' },
  ];

  const handleBackgroundChange = (event) => {
    setBackgroundImage(event.target.value);
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
        <select value={backgroundImage} onChange={handleBackgroundChange}>
          <option value="">Seleccionar Fondo</option>
          {backgrounds.map((bg, index) => (
            <option key={index} value={bg.value}>
              {bg.label}
            </option>
          ))}
        </select>
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
      <MusicProvider>
        <App />
      </MusicProvider>
    </Router>
  );
}

export default AppWrapper;
