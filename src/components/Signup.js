// Signup.js
import React, { useState, useEffect } from 'react';
import './Signup.css';

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    dob: '',
    gender: ''
  });

  useEffect(() => {
    const selectElement = document.querySelector('select[name="gender"]');
    if (formData.gender === 'hombre') {
      selectElement.style.backgroundColor = '#0000ff'; // Azul para hombre
      selectElement.style.color = '#ffffff'; // Texto blanco
    } else if (formData.gender === 'mujer') {
      selectElement.style.backgroundColor = '#ff1493'; // Rosa para mujer
      selectElement.style.color = '#ffffff'; // Texto blanco
    } else {
      selectElement.style.backgroundColor = '#333'; // Fondo por defecto
      selectElement.style.color = '#00ffea'; // Texto por defecto
    }
  }, [formData.gender]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users)); // Guardar los datos del usuario en localStorage
    onSignup(formData);
  };

  return (
    <div className="form-container">
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de Usuario:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Correo Electrónico:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Fecha de Nacimiento:
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Género:
          <select 
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione su género</option>
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
          </select>
        </label>
        <button type="submit">Crear Cuenta</button>
      </form>
    </div>
  );
};

export default Signup;
