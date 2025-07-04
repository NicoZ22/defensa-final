import axios from "axios";
import { URL_EMPLEADOS } from "../../../utils/endpoints";
import { useEffect, useState } from "react";
import '../../../styles/GESTION ADMIN/listarempleado.css'
import { CrearEmpleado } from "./CrearEmpleado";
import { EditarEmpleado } from "./EditarEmpleado";
import { EliminarEmpleado } from "./EliminarEmpleado";

export const ListarEmpleado = ({handleMostrarComponente}) => {
  const [empleados, setEmpleados] = useState([]);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarCrearEmpleadoModal, setMostrarCrearEmpleadoModal] = useState(false);
  const [mostrarEditarEmpleadoModal, setMostrarEditarEmpleadoModal] = useState(false);
  const [error, setError] = useState(null);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [empleadoAEliminar, setEmpleadoAEliminar] = useState(null);

  const obtenerEmpleados = async () => {
    try {
      const respuesta = await axios.get(URL_EMPLEADOS);
      setEmpleados(respuesta.data);
    } catch (error) {
      setError('Error al obtener la lista de empleados');
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  const handleVerDetalles = (empleado) => {
    setEmpleadoSeleccionado(empleado);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setEmpleadoSeleccionado(null);
  };

  const crearEmpleado = () => {
    setMostrarCrearEmpleadoModal(true);
  };

  const editarEmpleado = (empleado) => {
    setEmpleadoSeleccionado(empleado);
    setMostrarEditarEmpleadoModal(true);
  };

  const handleEliminarEmpleado = (empleado) => {
    setEmpleadoAEliminar(empleado);
    setMostrarModalEliminar(true);
  };

  return (
    <div className="listar-empleado-container-efra">
      {error && (
        <div className="listar-empleado-error-container-efra">
          <p className="listar-empleado-error-message-efra">{error}</p>
          <button onClick={() => setError(null)} className="listar-empleado-button-delete-efra">
            Cerrar
          </button>
        </div>
      )}
      <div className="listar-empleado-title-container-efra">
        <h2 className="listar-empleado-title-efra">Empleados</h2>
        <button onClick={crearEmpleado} className="listar-empleado-button-create-efra">Crear Empleado</button>
        <button onClick={() => handleMostrarComponente(null)} className="listar-empleado-button-delete-efra">Cerrar Lista</button>
      </div>
      <div className="listar-empleado-table-container-efra">
        <table className="listar-empleado-table-efra">
          <thead>
            <tr className="listar-empleado-table-header-efra">
              <th className="listar-empleado-table-header-cell-efra">Nombre</th>
              <th className="listar-empleado-table-header-cell-efra">Apellido</th>
              <th className="listar-empleado-table-header-cell-efra">Email</th>
              <th className="listar-empleado-table-header-cell-efra">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => (
              <tr key={empleado.id} className={`listar-empleado-table-row-efra ${empleadoSeleccionado && empleadoSeleccionado.id === empleado.id ? 'listar-empleado-table-row-selected-efra' : ''}`}>
                <td className="listar-empleado-table-cell-efra">{empleado.nombre}</td>
                <td className="listar-empleado-table-cell-efra">{empleado.apellido}</td>
                <td className="listar-empleado-table-cell-efra">{empleado.email}</td>
                <td className="listar-empleado-table-cell-efra">
                  <div>
                    <button
                      onClick={() => handleVerDetalles(empleado)}
                      className="listar-empleado-button-action-efra"
                    >
                      Ver detalles
                    </button>
                    <button onClick={() => editarEmpleado(empleado)} className="listar-empleado-button-edit-efra">Editar</button>
                    <button onClick={() => handleEliminarEmpleado(empleado)} className="listar-empleado-button-delete-efra">Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {mostrarModal && empleadoSeleccionado && (
        <div className="listar-empleado-modal-container-efra">
          <div className="listar-empleado-modal-content-efra">
            <div className="listar-empleado-modal-header-efra">
              <h3 className="listar-empleado-modal-title-efra">Detalles del empleado</h3>
              <button onClick={cerrarModal} className="listar-empleado-button-delete-efra">
                X
              </button>
            </div>
            <img src={`/ENTRENADORES/${empleadoSeleccionado.foto}`} alt={empleadoSeleccionado.nombre} />
            <p className="listar-empleado-modal-detail-efra">
              <span className="listar-empleado-modal-detail-label-efra">Nombre:</span> {empleadoSeleccionado.nombre}
            </p>
            <hr />
            <p className="listar-empleado-modal-detail-efra">
              <span className="listar-empleado-modal-detail-label-efra">Apellido:</span> {empleadoSeleccionado.apellido}
            </p>
            <hr />
            <p className="listar-empleado-modal-detail-efra">
              <span className="listar-empleado-modal-detail-label-efra">Edad:</span> {empleadoSeleccionado.edad}
            </p>
            <hr />
            <p className="listar-empleado-modal-detail-efra">
              <span className="listar-empleado-modal-detail-label-efra">Email:</span> {empleadoSeleccionado.email}
            </p>
            <hr />
            <p className="listar-empleado-modal-detail-efra">
              <span className="listar-empleado-modal-detail-label-efra">Teléfono:</span> {empleadoSeleccionado.tel}
            </p>
            <hr />
            <p className="listar-empleado-modal-detail-efra">
              <span className="listar-empleado-modal-detail-label-efra">DNI:</span> {empleadoSeleccionado.dni}
            </p>
            <hr />
            <p className="listar-empleado-modal-detail-efra">
              <span className="listar-empleado-modal-detail-label-efra">Descripción:</span> {empleadoSeleccionado.descripción}
            </p>
            <hr />
            <p className="listar-empleado-modal-detail-efra">
              <span className="listar-empleado-modal-detail-label-efra">Redes:</span> {empleadoSeleccionado.redes.length > 0 ? empleadoSeleccionado.redes.join(', ') : 'No tiene redes'}
            </p>
          </div>
        </div>
      )}
      {mostrarCrearEmpleadoModal && (
        <div className="listar-empleado-modal-container-efra">
          <div className="cerrar-modal-efra">
            <CrearEmpleado obtenerEmpleados={obtenerEmpleados} />
            <button onClick={() => setMostrarCrearEmpleadoModal(false)} className="listar-empleado-button-delete-efra">
              |------------------------X-------------------------|
            </button>
          </div>
        </div>
      )}
      {mostrarEditarEmpleadoModal && empleadoSeleccionado && (
        <div className="listar-empleado-modal-container-efra">
          <div className="cerrar-modal-efra">
            <EditarEmpleado empleado={empleadoSeleccionado} handleMostrarComponente={setMostrarEditarEmpleadoModal} actualizarEmpleados={obtenerEmpleados} />
            <button onClick={() => setMostrarEditarEmpleadoModal(false)} className="listar-empleado-button-delete-efra">
              |------------------------X-------------------------|
            </button>
          </div>
        </div>
      )}
      {mostrarModalEliminar && empleadoAEliminar && (
        <EliminarEmpleado 
          empleado={empleadoAEliminar} 
          handleMostrarComponente={setMostrarModalEliminar} 
          obtenerEmpleados={obtenerEmpleados} 
          empleados={empleados} 
          setEmpleados={setEmpleados} 
          setError={setError} 
        />
      )}
    </div>
  );
}