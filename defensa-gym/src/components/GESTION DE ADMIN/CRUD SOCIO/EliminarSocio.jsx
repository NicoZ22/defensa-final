import axios from "axios";
import { URL_SOCIOS } from "../../../utils/endpoints";
import '../../../styles/GESTION ADMIN/eliminarsocio.css'

export const EliminarSocio = ({ socio, handleMostrarComponente, obtenerSocios, socios, setSocios, setError }) => {
  const eliminarSocio = async () => {
    try {
      await axios.delete(`${URL_SOCIOS}/${socio.id}`);
      setSocios(socios.filter((s) => s.id !== socio.id));
      setError(null);
      handleMostrarComponente(false);
    } catch (error) {
      if (error.response) {
        setError(`Error ${error.response.status}: ${error.response.data}`);
      } else {
        setError('Error al eliminar el socio');
      }
    }
  };

  return (
    <div className="eliminar-socio-modal-container-nico">
      <div className="eliminar-socio-modal-content-nico">
        <div className="eliminar-socio-modal-header-nico">
          <h3 className="eliminar-socio-modal-title-nico">¿Estás seguro de eliminar al socio?</h3>
        </div>
        <p className="eliminar-socio-modal-detail-nico">
          Estás a punto de eliminar al socio {socio.nombre} {socio.apellido}.
        </p>
        <div className="eliminar-socio-modal-footer-nico">
          <button onClick={eliminarSocio} className="eliminar-socio-button-delete-nico">Eliminar</button>
          <button onClick={() => handleMostrarComponente(false)} className="eliminar-socio-button-cancelar-nico">Cancelar</button>
        </div>
      </div>
    </div>
  );
};