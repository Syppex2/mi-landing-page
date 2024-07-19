import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulación de envío del formulario
    setStatus('Enviando...');
    
    setTimeout(() => {
      console.log('Formulario enviado', { name, email });
      setStatus('Formulario enviado exitosamente');
      setName('');
      setEmail('');
    }, 2000); // Simula una espera de 2 segundos para la respuesta del servidor
  };

  return (
    <section className="section">
      <h2>Contacto</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Nombre" 
          required
        />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Correo electrónico" 
          required
        />
        <button type="submit">Enviar</button>
      </form>
      {status && <p>{status}</p>}
    </section>
  );
}

export default Contact;
