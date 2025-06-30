import { Contact } from "../../components/MAIN/Contact"
import "../../styles/MAIN/contact.css"

export const ContactPage = () => {
  return (
    <div className="contactos">
      <Contact />
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
  )
}



