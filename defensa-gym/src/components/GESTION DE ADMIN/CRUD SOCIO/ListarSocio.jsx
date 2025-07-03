import axios from "axios";
import { URL_SOCIOS } from "../../../utils/endpoints";
import { useEffect, useState } from "react";
import '../../../styles/GESTION ADMIN/listarsocio.css'
import { CrearSocio } from "./CrearSocio";
import { EditarSocio } from "./EditarSocio";
import { EliminarSocio } from "./EliminarSocio";

export const ListarSocio = ({handleMostrarComponente}) => {
  const [socios, setSocios] = useState([]);
  const [socioSeleccionado, setSocioSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarCrearSocioModal, setMostrarCrearSocioModal] = useState(false);
  const [mostrarEditarSocioModal, setMostrarEditarSocioModal] = useState(false);
  const [error, setError] = useState(null);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [socioAEliminar, setSocioAEliminar] = useState(null);

  const obtenerSocios = async () => {
    try {
      const respuesta = await axios.get(URL_SOCIOS);
      setSocios(respuesta.data);
    } catch (error) {
      setError('Error al obtener la lista de socios');
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerSocios();
  }, []);

  const handleVerDetalles = (socio) => {
    setSocioSeleccionado(socio);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setSocioSeleccionado(null);
  };

  const crearSocio = () => {
    setMostrarCrearSocioModal(true);
  };

  const editarSocio = (socio) => {
    setSocioSeleccionado(socio);
    setMostrarEditarSocioModal(true);
  };

  const handleEliminarSocio = (socio) => {
    setSocioAEliminar(socio);
    setMostrarModalEliminar(true);
  };

  return (
    <div className="listar-socio-container-nico">
      {error && (
        <div className="listar-socio-error-container-nico">
          <p className="listar-socio-error-message-nico">{error}</p>
          <button onClick={() => setError(null)} className="listar-socio-button-delete-nico">
            Cerrar
          </button>
        </div>
      )}
      <div className="listar-socio-title-container-nico">
        <h2 className="listar-socio-title-nico">Socios</h2>
        <button onClick={crearSocio} className="listar-socio-button-create-nico">Crear Socio</button>
        <button onClick={() => handleMostrarComponente(null)} className="listar-socio-button-delete-nico">Cerrar Lista</button>
      </div>
      <div className="listar-socio-table-container-nico">
        <table className="listar-socio-table-nico">
          <thead>
            <tr className="listar-socio-table-header-nico">
              <th className="listar-socio-table-header-cell-nico">Nombre</th>
              <th className="listar-socio-table-header-cell-nico">Apellido</th>
              <th className="listar-socio-table-header-cell-nico">Email</th>
              <th className="listar-socio-table-header-cell-nico">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {socios.map((socio) => (
              <tr key={socio.id} className={`listar-socio-table-row-nico ${socioSeleccionado && socioSeleccionado.id === socio.id ? 'listar-socio-table-row-selected-nico' : ''}`}>
                <td className="listar-socio-table-cell-nico">{socio.nombre}</td>
                <td className="listar-socio-table-cell-nico">{socio.apellido}</td>
                <td className="listar-socio-table-cell-nico">{socio.email}</td>
                <td className="listar-socio-table-cell-nico">
                  <div>
                    <button
                      onClick={() => handleVerDetalles(socio)}
                      className="listar-socio-button-action-nico"
                    >
                      Ver detalles
                    </button>
                    <button onClick={() => editarSocio(socio)} className="listar-socio-button-edit-nico">Editar</button>
                    <button onClick={() => handleEliminarSocio(socio)} className="listar-socio-button-delete-nico">Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {mostrarModal && socioSeleccionado && (
        <div className="listar-socio-modal-container-nico">
          <div className="listar-socio-modal-content-nico">
            <div className="listar-socio-modal-header-nico">
              <h3 className="listar-socio-modal-title-nico">Detalles del socio</h3>
              <button onClick={cerrarModal} className="listar-socio-button-delete-nico">
                X
              </button>
            </div>
            <p className="listar-socio-modal-detail-nico">
              <span className="listar-socio-modal-detail-label-nico">Nombre:</span> {socioSeleccionado.nombre}
            </p>
            <hr />
            <p className="listar-socio-modal-detail-nico">
              <span className="listar-socio-modal-detail-label-nico">Apellido:</span> {socioSeleccionado.apellido}
            </p>
            <hr />
            <p className="listar-socio-modal-detail-nico">
              <span className="listar-socio-modal-detail-label-nico">Edad:</span> {socioSeleccionado.edad}
            </p>
            <hr />
            <p className="listar-socio-modal-detail-nico">
              <span className="listar-socio-modal-detail-label-nico">Email:</span> {socioSeleccionado.email}
            </p>
            <hr />
            <p className="listar-socio-modal-detail-nico">
              <span className="listar-socio-modal-detail-label-nico">Teléfono:</span> {socioSeleccionado.tel}
            </p>
            <hr />
            <p className="listar-socio-modal-detail-nico">
              <span className="listar-socio-modal-detail-label-nico">DNI:</span> {socioSeleccionado.dni}
            </p>
            <hr />
            <p className="listar-socio-modal-detail-nico">
              <span className="listar-socio-modal-detail-label-nico">Descripción:</span> {socioSeleccionado.descripción}
            </p>
            <hr />
            <p className="listar-socio-modal-detail-nico">
              <span className="listar-socio-modal-detail-label-nico">Redes:</span> {socioSeleccionado.redes.length > 0 ? socioSeleccionado.redes.join(', ') : 'No tiene redes'}
            </p>
          </div>
        </div>
      )}
      {mostrarCrearSocioModal && (
        <div className="listar-socio-modal-container-nico">
          <div className="cerrar-modal-nico">
            <CrearSocio obtenerSocios={obtenerSocios} />
            <button onClick={() => setMostrarCrearSocioModal(false)} className="listar-socio-button-delete-nico">
              |------------------------X-------------------------|
            </button>
          </div>
        </div>
      )}
      {mostrarEditarSocioModal && socioSeleccionado && (
        <div className="listar-socio-modal-container-nico">
          <div className="cerrar-modal-nico">
            <EditarSocio socio={socioSeleccionado} handleMostrarComponente={setMostrarEditarSocioModal} actualizarSocios={obtenerSocios} />
            <button onClick={() => setMostrarEditarSocioModal(false)} className="listar-socio-button-delete-nico">
              |------------------------X-------------------------|
            </button>
          </div>
        </div>
      )}
      {mostrarModalEliminar && socioAEliminar && (
        <EliminarSocio 
          socio={socioAEliminar} 
          handleMostrarComponente={setMostrarModalEliminar} 
          obtenerSocios={obtenerSocios} 
          socios={socios} 
          setSocios={setSocios} 
          setError={setError} 
        />
      )}
    </div>
  );
}