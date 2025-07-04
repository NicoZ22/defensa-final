import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/MAIN/empleado.css';
import { URL_DISCIPLINAS, URL_SOCIOS, URL_EMPLEADOS } from '../../utils/endpoints';

export const Empleado = () => {
  const { id } = useParams();
  const [empleadoId, setEmpleadoId] = useState(id || localStorage.getItem('usuarioId'));

  useEffect(() => {
    if (id) {
      localStorage.setItem('usuarioId', id);
      setEmpleadoId(id);
    }
  }, [id]);

  const [empleado, setEmpleado] = useState({});
  const [clases, setClases] = useState([]);
  const [error, setError] = useState(null);
  const [disciplinaDetalle, setDisciplinaDetalle] = useState(null);
  const [socioDetalle, setSocioDetalle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const responseEmpleado = await axios.get(`${URL_EMPLEADOS}/${empleadoId}`);
        setEmpleado(responseEmpleado.data);

        const responseDisciplinas = await axios.get(URL_DISCIPLINAS);
        const disciplinas = responseDisciplinas.data;
        const clasesInscritas = [];

        disciplinas.forEach(disciplina => {
          disciplina.clases.forEach(clase => {
            if (clase.entrenador && clase.entrenador.id === empleadoId) {
              clasesInscritas.push({
                disciplina: disciplina.nombre,
                disciplinaId: disciplina.id,
                clase: clase,
              });
            }
          });
        });

        setClases(clasesInscritas);
      } catch (error) {
        setError(error.message);
      }
    };

    obtenerDatos();
  }, [empleadoId]);

  const handleVerMasDetallesDisciplina = async (disciplinaId) => {
    try {
      const responseDisciplina = await axios.get(`${URL_DISCIPLINAS}/${disciplinaId}`);
      setDisciplinaDetalle(responseDisciplina.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerMasDetallesSocio = async (socioId) => {
    try {
      const responseSocio = await axios.get(`${URL_SOCIOS}/${socioId}`);
      setSocioDetalle(responseSocio.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEliminarClase = async (disciplinaId, claseId) => {
    try {
      const responseDisciplina = await axios.get(`${URL_DISCIPLINAS}/${disciplinaId}`);
      const disciplina = responseDisciplina.data;
      const claseIndex = disciplina.clases.findIndex(clase => clase.id === claseId);
      disciplina.clases.splice(claseIndex, 1);
      await axios.patch(`${URL_DISCIPLINAS}/${disciplinaId}`, disciplina);
      // Actualizar la lista de clases
      const responseDisciplinas = await axios.get(URL_DISCIPLINAS);
      const disciplinas = responseDisciplinas.data;
      const clasesInscritas = [];

      disciplinas.forEach(disciplina => {
        disciplina.clases.forEach(clase => {
          if (clase.entrenador && clase.entrenador.id === empleadoId) {
            clasesInscritas.push({
              disciplina: disciplina.nombre,
              disciplinaId: disciplina.id,
              clase: clase,
            });
          }
        });
      });

      setClases(clasesInscritas);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="clases-empleado-efra-container">
      <div className="clases-empleado-efra-title-container">
        <h1 className="clases-empleado-efra-title">Clases asignadas</h1>
      </div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        clases.length === 0 ? (
          <p>No tienes clases asignadas. Visita la página de disciplinas para crear una clase.</p>
        ) : (
          clases.map((clase, index) => (
            <div key={index} className="clases-empleado-efra-card">
              <button className="clases-empleado-efra-button-action" onClick={() => handleEliminarClase(clase.disciplinaId, clase.clase.id)}>Eliminar clase</button>
              <h2 className="clases-empleado-efra-card-title">{clase.disciplina}</h2>
              <p className="clases-empleado-efra-card-detail">Días: {clase.clase.dias}</p>
              <p className="clases-empleado-efra-card-detail">Horarios: {clase.clase.horarios}</p>
              <p className="clases-empleado-efra-card-detail">Nivel: {clase.clase.nivel}</p>
              <button className="clases-empleado-efra-button-action" onClick={() => handleVerMasDetallesDisciplina(clase.disciplinaId)}>Ver más detalles</button>
              <h3>Socios inscritos:</h3>
              {clase.clase.socios.map((socio, socioIndex) => (
                <div key={socioIndex}>
                  <p>{socio.nombre}</p>
                  <button className="clases-empleado-efra-button-action" onClick={() => handleVerMasDetallesSocio(socio.id)}>Ver más detalles</button>
                </div>
              ))}
            </div>
          ))
        )
      )}
      {disciplinaDetalle && (
        <div className="clases-empleado-efra-modal">
          <div className="clases-empleado-efra-modal-content">
            <h2 className="clases-empleado-efra-modal-title">Detalles de la disciplina</h2>
            <img src={`/IMAGENES DISCIPLINAS/${disciplinaDetalle.foto}`} alt={disciplinaDetalle.nombre} />
            <p className="clases-empleado-efra-modal-detail">Nombre: {disciplinaDetalle.nombre}</p>
            <p className="clases-empleado-efra-modal-detail">Categoría: {disciplinaDetalle.categoria}</p>
            <p className="clases-empleado-efra-modal-detail">Descripción: {disciplinaDetalle.descripción}</p>
            <p className="clases-empleado-efra-modal-detail">Sector: {disciplinaDetalle.sector}</p>
            <button className="clases-empleado-efra-modal-button" onClick={() => setDisciplinaDetalle(null)}>Cerrar</button>
          </div>
        </div>
      )}
      {socioDetalle && (
        <div className="clases-empleado-efra-modal">
          <div className="clases-empleado-efra-modal-content">
            <h2 className="clases-empleado-efra-modal-title">Detalles del socio</h2>
            <p className="clases-empleado-efra-modal-detail">Nombre: {socioDetalle.nombre}</p>
            <p className="clases-empleado-efra-modal-detail">Apellido: {socioDetalle.apellido}</p>
            <p className="clases-empleado-efra-modal-detail">Edad: {socioDetalle.edad}</p>
            <p className="clases-empleado-efra-modal-detail">Email: {socioDetalle.email}</p>
            <p className="clases-empleado-efra-modal-detail">Teléfono: {socioDetalle.tel}</p>
            <button className="clases-empleado-efra-modal-button" onClick={() => setSocioDetalle(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};