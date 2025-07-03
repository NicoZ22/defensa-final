import axios from "axios";
import { URL_SOCIOS } from "../../../utils/endpoints";
import { useState, useEffect } from "react";
import '../../../styles/GESTION ADMIN/editarsocio.css'

export const EditarSocio = ({ socio, handleMostrarComponente, actualizarSocios }) => {
  const [editarSocio, setEditarSocio] = useState(socio);
  const [error, setError] = useState(null);

  useEffect(() => {
    setEditarSocio(socio);
  }, [socio]);

  const handleChange = (event) => {
    setEditarSocio({ ...editarSocio, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${URL_SOCIOS}/${editarSocio.id}`, editarSocio);
      handleMostrarComponente(null);
      actualizarSocios();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="editar-socio-container-nico">
      <form className="editar-socio-form-nico" onSubmit={handleSubmit}>
        <h1 className="editar-socio-title-nico">Editar Socio</h1>
        <div className="editar-socio-form-group-nico">
          <label className="editar-socio-form-label-nico">Nombre:</label>
          <input
            className="editar-socio-form-input-nico"
            type="text"
            name="nombre"
            value={editarSocio.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="editar-socio-form-group-nico">
          <label className="editar-socio-form-label-nico">Apellido:</label>
          <input
            className="editar-socio-form-input-nico"
            type="text"
            name="apellido"
            value={editarSocio.apellido}
            onChange={handleChange}
          />
        </div>
        <div className="editar-socio-form-group-nico">
          <label className="editar-socio-form-label-nico">Edad:</label>
          <input
            className="editar-socio-form-input-nico"
            type="number"
            name="edad"
            value={editarSocio.edad}
            onChange={handleChange}
          />
        </div>
        <div className="editar-socio-form-group-nico">
          <label className="editar-socio-form-label-nico">Email:</label>
          <input
            className="editar-socio-form-input-nico"
            type="email"
            name="email"
            value={editarSocio.email}
            onChange={handleChange}
          />
        </div>
        <div className="editar-socio-form-group-nico">
          <label className="editar-socio-form-label-nico">Teléfono:</label>
          <input
            className="editar-socio-form-input-nico"
            type="text"
            name="tel"
            value={editarSocio.tel}
            onChange={handleChange}
          />
        </div>
        <div className="editar-socio-form-group-nico">
          <label className="editar-socio-form-label-nico">DNI:</label>
          <input
            className="editar-socio-form-input-nico"
            type="text"
            name="dni"
            value={editarSocio.dni}
            onChange={handleChange}
          />
        </div>
        <div className="editar-socio-form-group-nico">
        <label className="editar-socio-form-label-nico">Descripción:</label>
        <textarea
          className="editar-socio-form-input-nico"
          name="descripción"
          value={editarSocio.descripción}
          onChange={handleChange}
        />
      </div>
      <div className="editar-socio-form-group-nico">
        <label className="editar-socio-form-label-nico">Redes:</label>
        <input
          className="editar-socio-form-input-nico"
          type="text"
          name="redes"
          value={editarSocio.redes && editarSocio.redes.join(', ')}
          onChange={(event) => setEditarSocio({ ...editarSocio, redes: event.target.value.split(', ') })}
        />
      </div>
        <button className="editar-socio-button-nico" type="submit">
          Guardar Cambios
        </button>
        {error && <p className="editar-socio-error-message-nico">{error}</p>}
      </form>
    </div>
  );
};