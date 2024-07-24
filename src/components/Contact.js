import React, { useState, useEffect } from 'react';
import './Contact.css';

function Contact() {
  const [formVisible, setFormVisible] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    fecha: '',
    telefono: '',
    direccion: '',
    region: '',
    mensaje: '',
    click: false,
  });
  const [dataArr, setDataArr] = useState([]);
  const [status, setStatus] = useState('');
  const [regiones, setRegiones] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    const hoy = new Date();
    const fechaActual = hoy.toISOString().split('T')[0];
    setFormData((prevData) => ({ ...prevData, fecha: fechaActual }));

    const fetchRegiones = async () => {
      try {
        const response = await fetch('https://api.shipit.cl/v/regions');
        const data = await response.json();
        setRegiones(data);
      } catch (error) {
        console.error('Error fetching regions:', error);
      }
    };

    fetchRegiones();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const mostrarContact = () => setFormVisible(true);
  const ocultarContact = () => setFormVisible(false);

  const saveData = () => {
    if (Object.values(formData).some(value => value === '')) {
      setStatus('Por favor, rellene todos los campos del formulario');
    } else {
      const newData = { ...formData };
      setDataArr((prevDataArr) => [...prevDataArr, newData]);
      setStatus('Datos guardados');
      setFormData({
        nombre: '',
        email: '',
        fecha: '',
        telefono: '',
        direccion: '',
        region: '',
        mensaje: '',
        click: false,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      setStatus('Por favor, rellene los campos obligatorios');
    } else {
      setStatus('Enviando...');
      setTimeout(() => {
        console.log('Formulario enviado', formData);
        setStatus('Formulario enviado exitosamente');
      }, 2000);
    }
  };

  const downloadJSON = () => {
    const jsonData = JSON.stringify(dataArr);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'datos.json';
    link.click();
    URL.revokeObjectURL(url);
    setDataArr([]);
  };

  return (
    <section className="section" id="contacto">
      <h2>Contacto</h2>
      <p>Ponte en contacto con nosotros para más información sobre nuestros productos.</p>

      <button className="formcontac" onClick={mostrarContact}>Mostrar formulario</button>
      <button className="formcontac" onClick={ocultarContact}>Ocultar formulario</button>

      {formVisible && (
        <form id="contactForm" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Nombre"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Correo electrónico"
            required
          />
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleInputChange}
          />
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            placeholder="Número de teléfono"
          />
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
            placeholder="Dirección"
          />
          <select
            name="region"
            value={formData.region}
            onChange={handleInputChange}
          >
            <option value="">Seleccione una región</option>
            {regiones.map((region) => (
              <option key={region.id} value={region.id}>{region.name}</option>
            ))}
          </select>
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleInputChange}
            placeholder="Mensaje"
            required
          ></textarea>
          <label>
            <input
              type="checkbox"
              name="click"
              checked={formData.click}
              onChange={handleInputChange}
            />
            He leído y acepto la Política de privacidad
          </label>
          <button type="submit">Enviar</button>
          <button type="button" onClick={saveData}>Guardar Datos</button>
          <button type="button" onClick={downloadJSON}>Descargar JSON</button>
        </form>
      )}
      {status && <p>{status}</p>}
    </section>
  );
}

export default Contact;
