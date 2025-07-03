import axios from "axios";
import { URL_DISCIPLINAS } from "../../../utils/endpoints";
import { useEffect, useState } from "react";
import '../../../styles/GESTION ADMIN/listardisciplina.css'
import { CrearDisciplina } from "./CrearDisciplina";
import { EditarDisciplina } from "./EditarDisciplina";
import { EliminarDisciplina } from "./EliminarDisciplina";

export const ListarDisciplina = ({handleMostrarComponente}) => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [disciplinaSeleccionada, setDisciplinaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarCrearDisciplinaModal, setMostrarCrearDisciplinaModal] = useState(false);
  const [mostrarEditarDisciplinaModal, setMostrarEditarDisciplinaModal] = useState(false);
  const [error, setError] = useState(null);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [disciplinaAEliminar, setDisciplinaAEliminar] = useState(null);
  const [mostrarModalClases, setMostrarModalClases] = useState(false);

  const obtenerDisciplinas = async () => {
    try {
      const respuesta = await axios.get(URL_DISCIPLINAS);
      setDisciplinas(respuesta.data);
    } catch (error) {
      setError('Error al obtener la lista de disciplinas');
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerDisciplinas();
  }, []);

  const handleVerDetalles = (disciplina) => {
    setDisciplinaSeleccionada(disciplina);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setDisciplinaSeleccionada(null);
  };

  const crearDisciplina = () => {
    setMostrarCrearDisciplinaModal(true);
  };

  const editarDisciplina = (disciplina) => {
    setDisciplinaSeleccionada(disciplina);
    setMostrarEditarDisciplinaModal(true);
  };

  const handleEliminarDisciplina = (disciplina) => {
    setDisciplinaAEliminar(disciplina);
    setMostrarModalEliminar(true);
  };

  return (
    <div className="listar-disciplina-container-amparo">
      {error && (
        <div className="listar-disciplina-error-container-amparo">
          <p className="listar-disciplina-error-message-amparo">{error}</p>
          <button onClick={() => setError(null)} className="listar-disciplina-button-delete-amparo">
            Cerrar
          </button>
        </div>
      )}
      <div className="listar-disciplina-title-container-amparo">
        <h2 className="listar-disciplina-title-amparo">Disciplinas</h2>
        <button onClick={crearDisciplina} className="listar-disciplina-button-create-amparo">Crear Disciplina</button>
        <button onClick={() => handleMostrarComponente(null)} className="listar-disciplina-button-delete-amparo">Cerrar Lista</button>
      </div>
      <div className="listar-disciplina-table-container-amparo">
        <table className="listar-disciplina-table-amparo">
          <thead>
            <tr className="listar-disciplina-table-header-amparo">
              <th className="listar-disciplina-table-header-cell-amparo">Nombre</th>
              <th className="listar-disciplina-table-header-cell-amparo">Categoría</th>
              <th className="listar-disciplina-table-header-cell-amparo">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {disciplinas.map((disciplina) => (
              <tr key={disciplina.id} className={`listar-disciplina-table-row-amparo ${disciplinaSeleccionada && disciplinaSeleccionada.id === disciplina.id ? 'listar-disciplina-table-row-selected-amparo' : ''}`}>
                <td className="listar-disciplina-table-cell-amparo">{disciplina.nombre}</td>
                <td className="listar-disciplina-table-cell-amparo">{disciplina.categoria}</td>
                <td className="listar-disciplina-table-cell-amparo">
                  <div>
                    <button
                      onClick={() => handleVerDetalles(disciplina)}
                      className="listar-disciplina-button-action-amparo"
                    >
                      Ver detalles
                    </button>
                    <button onClick={() => editarDisciplina(disciplina)} className="listar-disciplina-button-edit-amparo">Editar</button>
                    <button onClick={() => handleEliminarDisciplina(disciplina)} className="listar-disciplina-button-delete-amparo">Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {mostrarModal && disciplinaSeleccionada && (
        <div className="listar-disciplina-modal-container-amparo">
          <div className="listar-disciplina-modal-content-amparo">
            <div className="listar-disciplina-modal-header-amparo">
              <h3 className="listar-disciplina-modal-title-amparo">Detalles de la disciplina</h3>
              <button onClick={cerrarModal} className="listar-disciplina-button-delete-amparo">
                X
              </button>
            </div>
            <img src={`/IMAGENES DISCIPLINAS/${disciplinaSeleccionada.foto}`} alt={disciplinaSeleccionada.nombre} />
            <p className="listar-disciplina-modal-detail-amparo">
              <span className="listar-disciplina-modal-detail-label-amparo">Nombre:</span> {disciplinaSeleccionada.nombre}
            </p>
            <hr />
            <p className="listar-disciplina-modal-detail-amparo">
              <span className="listar-disciplina-modal-detail-label-amparo">Categoría:</span> {disciplinaSeleccionada.categoria}
            </p>
            <hr />
            <p className="listar-disciplina-modal-detail-amparo">
              <span className="listar-disciplina-modal-detail-label-amparo">Descripción:</span> {disciplinaSeleccionada.descripción}
            </p>
            <hr />
            <p className="listar-disciplina-modal-detail-amparo">
              <span className="listar-disciplina-modal-detail-label-amparo">Sector:</span> {disciplinaSeleccionada.sector}
            </p>
            <button onClick={() => setMostrarModalClases(true)} className="listar-disciplina-button-action-amparo">Ver Clases</button>
          </div>
        </div>
      )}
      {mostrarModalClases && disciplinaSeleccionada && (
        <div className="listar-disciplina-modal-container-amparo">
          <div className="listar-disciplina-modal-content-amparo">
            <div className="listar-disciplina-modal-header-amparo">
              <h3 className="listar-disciplina-modal-title-amparo">Clases de {disciplinaSeleccionada.nombre}</h3>
              <button onClick={() => setMostrarModalClases(false)} className="listar-disciplina-button-delete-amparo">
                X
              </button>
            </div>
            {disciplinaSeleccionada.clases.map((clase) => (
              <div key={clase.id}>
                <p>Entrenador: {clase.entrenador}</p>
                <p>Días: {clase.dias}</p>
                <p>Horarios: {clase.horarios}</p>
                <p>Nivel: {clase.nivel}</p>
                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
      {mostrarCrearDisciplinaModal && (
        <div className="listar-disciplina-modal-container-amparo">
          <div className="cerrar-modal-amparo">
            <CrearDisciplina obtenerDisciplinas={obtenerDisciplinas} />
            <button onClick={() => setMostrarCrearDisciplinaModal(false)} className="listar-disciplina-button-delete-amparo">
              |------------------------X-------------------------|
            </button>
          </div>
        </div>
      )}
      {mostrarEditarDisciplinaModal && disciplinaSeleccionada && (
        <div className="listar-disciplina-modal-container-amparo">
          <div className="cerrar-modal-amparo">
            <EditarDisciplina disciplina={disciplinaSeleccionada} handleMostrarComponente={setMostrarEditarDisciplinaModal} actualizarDisciplinas={obtenerDisciplinas} />
            <button onClick={() => setMostrarEditarDisciplinaModal(false)} className="listar-disciplina-button-delete-amparo">
              |------------------------X-------------------------|
            </button>
          </div>
        </div>
      )}
      {mostrarModalEliminar && disciplinaAEliminar && (
        <EliminarDisciplina 
          disciplina={disciplinaAEliminar} 
          handleMostrarComponente={setMostrarModalEliminar} 
          obtenerDisciplinas={obtenerDisciplinas} 
          disciplinas={disciplinas} 
          setDisciplinas={setDisciplinas} 
          setError={setError} 
        />
      )}
    </div>
  );
}