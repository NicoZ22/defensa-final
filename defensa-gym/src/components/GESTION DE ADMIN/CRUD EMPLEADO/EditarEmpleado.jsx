import axios from "axios";
import { URL_EMPLEADOS } from "../../../utils/endpoints";
import { useState, useEffect } from "react";
import '../../../styles/GESTION ADMIN/editarEmpleado.css'

export const EditarEmpleado = ({ empleado, handleMostrarComponente, actualizarEmpleados }) => {
  const [editarEmpleado, setEditarEmpleado] = useState(empleado);
  const [error, setError] = useState(null);

  useEffect(() => {
    setEditarEmpleado(empleado);
  }, [empleado]);

  const handleChange = (event) => {
    setEditarEmpleado({ ...editarEmpleado, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${URL_EMPLEADOS}/${editarEmpleado.id}`, editarEmpleado);
      handleMostrarComponente(null);
      actualizarEmpleados();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="editar-empleado-container-efra">
      <form className="editar-empleado-form-efra" onSubmit={handleSubmit}>
        <h1 className="editar-empleado-title-efra">Editar Empleado</h1>
        <div className="editar-empleado-form-group-efra">
          <label className="editar-empleado-form-label-efra">Nombre:</label>
          <input
            className="editar-empleado-form-input-efra"
            type="text"
            name="nombre"
            value={editarEmpleado.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="editar-empleado-form-group-efra">
          <label className="editar-empleado-form-label-efra">Apellido:</label>
          <input
            className="editar-empleado-form-input-efra"
            type="text"
            name="apellido"
            value={editarEmpleado.apellido}
            onChange={handleChange}
          />
        </div>
        <div className="editar-empleado-form-group-efra">
          <label className="editar-empleado-form-label-efra">Edad:</label>
          <input
            className="editar-empleado-form-input-efra"
            type="number"
            name="edad"
            value={editarEmpleado.edad}
            onChange={handleChange}
          />
        </div>
        <div className="editar-empleado-form-group-efra">
          <label className="editar-empleado-form-label-efra">Email:</label>
          <input
            className="editar-empleado-form-input-efra"
            type="email"
            name="email"
            value={editarEmpleado.email}
            onChange={handleChange}
          />
        </div>
        <div className="editar-empleado-form-group-efra">
          <label className="editar-empleado-form-label-efra">Teléfono:</label>
          <input
            className="editar-empleado-form-input-efra"
            type="text"
            name="tel"
            value={editarEmpleado.tel}
            onChange={handleChange}
          />
        </div>
        <div className="editar-empleado-form-group-efra">
          <label className="editar-empleado-form-label-efra">DNI:</label>
          <input
            className="editar-empleado-form-input-efra"
            type="text"
            name="dni"
            value={editarEmpleado.dni}
            onChange={handleChange}
          />
        </div>
        <div className="editar-empleado-form-group-efra">
          <label className="editar-empleado-form-label-efra">Descripción:</label>
          <textarea
            className="editar-empleado-form-input-efra"
            name="descripción"
            value={editarEmpleado.descripción}
            onChange={handleChange}
          />
        </div>
        <div className="editar-empleado-form-group-efra">
          <label className="editar-empleado-form-label-efra">Redes:</label>
          <input
            className="editar-empleado-form-input-efra"
            type="text"
            name="redes"
            value={editarEmpleado.redes && editarEmpleado.redes.join(', ')}
            onChange={(event) => setEditarEmpleado({ ...editarEmpleado, redes: event.target.value.split(', ') })}
          />
        </div>
        <button className="editar-empleado-button-efra" type="submit">
          Guardar Cambios
        </button>
        {error && <p className="editar-empleado-error-message-efra">{error}</p>}
      </form>
    </div>
  );
};