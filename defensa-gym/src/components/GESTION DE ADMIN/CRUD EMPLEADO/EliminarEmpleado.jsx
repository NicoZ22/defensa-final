import axios from "axios";
import { URL_EMPLEADOS } from "../../../utils/endpoints";
import '../../../styles/GESTION ADMIN/eliminarempleado.css'

export const EliminarEmpleado = ({ empleado, handleMostrarComponente, obtenerEmpleados, empleados, setEmpleados, setError }) => {
  const eliminarEmpleado = async () => {
    try {
      await axios.delete(`${URL_EMPLEADOS}/${empleado.id}`);
      setEmpleados(empleados.filter((e) => e.id !== empleado.id));
      setError(null);
      handleMostrarComponente(false);
    } catch (error) {
      if (error.response) {
        setError(`Error ${error.response.status}: ${error.response.data}`);
      } else {
        setError('Error al eliminar el empleado');
      }
    }
  };

  return (
    <div className="eliminar-empleado-modal-container-efra">
      <div className="eliminar-empleado-modal-content-efra">
        <div className="eliminar-empleado-modal-header-efra">
          <h3 className="eliminar-empleado-modal-title-efra">¿Estás seguro de eliminar al empleado?</h3>
        </div>
        <p className="eliminar-empleado-modal-detail-efra">
          Estás a punto de eliminar al empleado {empleado.nombre} {empleado.apellido}.
        </p>
        <div className="eliminar-empleado-modal-footer-efra">
          <button onClick={eliminarEmpleado} className="eliminar-empleado-button-delete-efra">Eliminar</button>
          <button onClick={() => handleMostrarComponente(false)} className="eliminar-empleado-button-cancelar-efra">Cancelar</button>
        </div>
      </div>
    </div>
  );
};