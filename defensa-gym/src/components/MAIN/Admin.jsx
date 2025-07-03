import axios from "axios";
import { URL_DISCIPLINAS, URL_EMPLEADOS, URL_SOCIOS } from "../../utils/endpoints";
import { useEffect, useState } from "react";
import '../../styles/MAIN/admin.css';
import { ListarSocio } from "../GESTION ADMIN/CRUD SOCIO/ListarSocio";
import { ListarEmpleado } from "../GESTION ADMIN/CRUD EMPLEADO/ListarEmpleado";
import { ListarDisciplina } from "../GESTION ADMIN/CRUD DISCIPLINA/ListarDisciplina";

export const Admin = () => {
  const [sociosCount, setSociosCount] = useState(0);
  const [empleadosCount, setEmpleadosCount] = useState(0);
  const [disciplinasCount, setDisciplinasCount] = useState(0);
  const [mostrarComponente, setMostrarComponente] = useState(null);

  const actualizarDatos = async () => {
    const sociosResponse = await axios.get(URL_SOCIOS);
    setSociosCount(sociosResponse.data.length);

    const empleadosResponse = await axios.get(URL_EMPLEADOS);
    setEmpleadosCount(empleadosResponse.data.length);

    const disciplinasResponse = await axios.get(URL_DISCIPLINAS);
    setDisciplinasCount(disciplinasResponse.data.length);
  };

  useEffect(() => {
    actualizarDatos();
  }, []);

  const handleMostrarComponente = (componente) => {
    setMostrarComponente(componente);
  };

  return (
    <div className="container-nico">
      <h1 className="dashboard-title-nico">Dashboard de Admin</h1>
      <button onClick={actualizarDatos}>
        Actualizar Datos
      </button>
      <div className="card-container-nico">
        <div className="card-nico">
          <h2 className="card-title-nico">Socios</h2>
          <p className="card-text-nico">Total de socios: {sociosCount}</p>
          <button
            onClick={() => handleMostrarComponente('socios')}
            className="button-nico"
          >
            Listar Socios
          </button>
        </div>
        <div className="card-nico">
          <h2 className="card-title-nico">Empleados</h2>
          <p className="card-text-nico">Total de empleados: {empleadosCount}</p>
          <button
            onClick={() => handleMostrarComponente('empleados')}
            className="button-nico"
          >
            Listar Empleados
          </button>
        </div>
        <div className="card-nico">
          <h2 className="card-title-nico">Disciplinas</h2>
          <p className="card-text-nico">Total de disciplinas: {disciplinasCount}</p>
          <button
            onClick={() => handleMostrarComponente('disciplinas')}
            className="button-nico"
          >
            Listar Disciplinas
          </button>
        </div>
      </div>
      {mostrarComponente && (
        <div className={`list-container-nico ${mostrarComponente ? 'show' : 'hide'}`}>
          {mostrarComponente === 'socios' && <ListarSocio handleMostrarComponente={handleMostrarComponente} />}
          {mostrarComponente === 'empleados' && <ListarEmpleado handleMostrarComponente={handleMostrarComponente} />}
          {mostrarComponente === 'disciplinas' && <ListarDisciplina handleMostrarComponente={handleMostrarComponente} />}
        </div>
      )}
    </div>
  );
}
