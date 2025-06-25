import React, { useEffect, useState } from 'react';
import '../css/admin.css'; // Asegurate de tener este archivo en la misma carpeta

const BuzonMensaje = () => {
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
    <div className="admin-container">
      <h1>Panel de Administración</h1>

      <div className="admin-controles">
        <button className="btn borrar" onClick={borrarTodos}>Borrar todos</button>
        <button className="btn exportar" onClick={exportarJSON}>Exportar JSON</button>
      </div>

      {mensajes.length === 0 ? (
        <p>No hay mensajes registrados.</p>
      ) : (
        <div className="mensaje-lista">
          {mensajes.map((msg, index) => (
            <div key={index} className="mensaje-item">
              <strong>{msg.nombre} {msg.apellido}</strong><br />
              <em>Email: {msg.email}</em><br />
              <em>Usuario: {msg.usuario || "anónimo"}</em><br />
              <p>{msg.mensaje}</p>
              <button className="btn eliminar" onClick={() => eliminarMensaje(index)}>Eliminar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuzonMensaje;
