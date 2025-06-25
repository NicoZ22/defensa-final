import React from 'react';
import Formulario from '../componentes/Formulario';
import "../css/contac.css";

const Contactos = () => {
  const numeroWhatsApp = "5491123456789"; // Cambialo por tu número (con código país sin signos)
  const mensajeWhatsApp = encodeURIComponent("¡Hola! Me contacté desde la página y quiero más información.");

  return (
    <div className='contactos'>
      <div>
        <Formulario />
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p>¿Querés contactarnos rápido? <br />  
          Hacé clic en el botón y envianos un mensaje por WhatsApp.</p>

          <a 
            href={`https://wa.me/${numeroWhatsApp}?text=${mensajeWhatsApp}`} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              backgroundColor: "#25D366",
              color: "white",
              padding: "12px 25px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "16px",
              marginTop: "10px"
            }}
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contactos;
