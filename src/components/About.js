import React from 'react';
import './About.css';

function About() {
  return (
    <section id="about" className="section">
      <h2>Quiénes Somos</h2>
      <p>
        Somos un equipo de profesionales comprometidos con la excelencia. Nuestro objetivo es proporcionar soluciones innovadoras y de alta calidad para nuestros clientes. Estamos orgullosos de ser parte de la comunidad {' '}
        <a 
          href="https://portales.inacap.cl/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inacap-link"
        >
          Inacap
        </a>.
      </p>
    </section>
  );
}

export default About;
