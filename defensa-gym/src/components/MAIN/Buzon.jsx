import { useEffect, useState } from "react";
import "../../styles/MAIN/buzon.css"; 

export const Buzon = () => {
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("mensajes")) || [];
    setMensajes(datos);
  }, []);

  const eliminarMensaje = (index) => {
    const nuevos = mensajes.filter((_, i) => i !== index);
    setMensajes(nuevos);
    localStorage.setItem("mensajes", JSON.stringify(nuevos));
  };

  const borrarTodos = () => {
    if (window.confirm("¿Borrar todos los mensajes?")) {
      localStorage.removeItem("mensajes");
      setMensajes([]);
    }
  };

  const exportarJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(mensajes, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", dataStr);
    link.setAttribute("download", "mensajes.json");
    link.click();
  };



  return (
    <div className="admin-ricardo-container">
      <h1>Panel de Mensajes</h1>

      <div className="admin-ricardo-controles">
        <button className="admin-ricardo-btn borrar" onClick={borrarTodos}>Borrar todos</button>
        
      </div>

      {mensajes.length === 0 ? (
        <p>No hay mensajes registrados.</p>
      ) : (
        <div className="admin-ricardo-mensaje-lista">
          {mensajes.map((msg, index) => (
            <div key={index} className="admin-ricardo-mensaje-item">
              <strong>{msg.nombre} {msg.apellido}</strong><br />
              <em>Email: {msg.email}</em><br />
              <em>Usuario: {msg.usuario || "anónimo"}</em><br />
              <p>{msg.mensaje}</p>
              <button className="admin-ricardo-btn eliminar" onClick={() => eliminarMensaje(index)}>Eliminar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};