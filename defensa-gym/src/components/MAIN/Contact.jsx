import "../../styles/MAIN/contact.css"
import React, { useState } from "react";


export const Contact = () => {

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
    const usuario = localStorage.getItem("rol");

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
    <div className="contactos">
      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2 className="contact-title">Contacto</h2>
          <div className="contact-form-group">
            <label className="contact-form-label" htmlFor="nombre">Nombre:</label>
            <input className="contact-form-input" type="text" id="nombre" name="nombre" required value={formData.nombre} onChange={handleChange} />
          </div>
          <div className="contact-form-group">
            <label className="contact-form-label" htmlFor="apellido">Apellido:</label>
            <input className="contact-form-input" type="text" id="apellido" name="apellido" required value={formData.apellido} onChange={handleChange} />
          </div>
          <div className="contact-form-group">
            <label className="contact-form-label" htmlFor="email">Email:</label>
            <input className="contact-form-input" type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
          </div>
          <div className="contact-form-group">
            <label className="contact-form-label" htmlFor="mensaje">Mensaje:</label>
            <textarea className="contact-form-textarea" id="mensaje" name="mensaje" required value={formData.mensaje} onChange={handleChange}></textarea>
          </div>
          <button className="contact-button" type="submit">Enviar</button>
        </form>
        <div className="contactos__texto">
          <h1>Contactanos</h1>
          <p>
            Si tienes alguna pregunta o inquietud, no dudes en contactarnos. Estamos aquí para ayudarte.
          </p>
          <p>
            Puedes enviarnos un mensaje a través del formulario de contacto o llamarnos directamente. Nos comprometemos a responder a todas las consultas lo antes posible.
          </p>
          <p>
            También puedes seguirnos en nuestras redes sociales para estar al tanto de las últimas novedades y promociones.
          </p>
          <div>
            <div>
              <button
                href="https://wa.me/549XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn"
                style={{ backgroundColor: "#25D366", color: "white" , fontSize: "16px", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer" }}
              >
              Contactar por WhatsApp
              </button>
            </div>      
          </div>
          <p>
            ¡Esperamos saber de ti pronto!
          </p>
        </div>
      </div>
    </div>
  );
};