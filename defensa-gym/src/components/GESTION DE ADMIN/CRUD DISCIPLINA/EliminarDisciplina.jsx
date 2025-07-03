import axios from "axios";
import { URL_DISCIPLINAS } from "../../../utils/endpoints";
import '../../../styles/GESTION ADMIN/eliminardisciplina.css'

export const EliminarDisciplina = ({ disciplina, handleMostrarComponente, obtenerDisciplinas, disciplinas, setDisciplinas, setError }) => {
  const eliminarDisciplina = async () => {
    try {
      await axios.delete(`${URL_DISCIPLINAS}/${disciplina.id}`);
      setDisciplinas(disciplinas.filter((d) => d.id !== disciplina.id));
      setError(null);
      handleMostrarComponente(false);
    } catch (error) {
      if (error.response) {
        setError(`Error ${error.response.status}: ${error.response.data}`);
      } else {
        setError('Error al eliminar la disciplina');
      }
    }
  };

  return (
    <div className="eliminar-disciplina-modal-container-amparo">
      <div className="eliminar-disciplina-modal-content-amparo">
        <div className="eliminar-disciplina-modal-header-amparo">
          <h3 className="eliminar-disciplina-modal-title-amparo">¿Estás seguro de eliminar la disciplina?</h3>
        </div>
        <p className="eliminar-disciplina-modal-detail-amparo">
          Estás a punto de eliminar la disciplina {disciplina.nombre}.
        </p>
        <div className="eliminar-disciplina-modal-footer-amparo">
          <button onClick={eliminarDisciplina} className="eliminar-disciplina-button-delete-amparo">Eliminar</button>
          <button onClick={() => handleMostrarComponente(false)} className="eliminar-disciplina-button-cancelar-amparo">Cancelar</button>
        </div>
      </div>
    </div>
  );
};