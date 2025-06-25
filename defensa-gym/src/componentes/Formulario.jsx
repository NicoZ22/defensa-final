import React, { useState } from 'react';
import "../css/Formulario.css";

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtener el usuario actual desde localStorage
    const usuario = localStorage.getItem("usuario") || "anónimo";

    // Obtener mensajes anteriores del localStorage
    const mensajesGuardados = JSON.parse(localStorage.getItem("mensajes")) || [];

    // Agregar nuevo mensaje incluyendo el usuario
    const nuevoMensaje = {
      ...formData,
      usuario
    };

    const nuevosMensajes = [...mensajesGuardados, nuevoMensaje];

    // Guardar en localStorage
    localStorage.setItem("mensajes", JSON.stringify(nuevosMensajes));

    // Limpiar el formulario
    setFormData({
      nombre: '',
      apellido: '',
      email: '',
      mensaje: '',
    });

    alert("Mensaje enviado por " + usuario);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" required value={formData.nombre} onChange={handleChange} />
          
          <label htmlFor="apellido">Apellido</label>
          <input type="text" id="apellido" name="apellido" required value={formData.apellido} onChange={handleChange} />
        </div>
        
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
        </div>
        
        <div>
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea id="mensaje" name="mensaje" required value={formData.mensaje} onChange={handleChange}></textarea>
        </div>
        
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Formulario;
