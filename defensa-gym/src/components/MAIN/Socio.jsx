import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../styles/MAIN/socio.css';
import { URL_DISCIPLINAS, URL_SOCIOS, URL_EMPLEADOS } from '../../utils/endpoints';

export const Socio = () => {
  const { id } = useParams();
  const [socioId, setSocioId] = useState(id || localStorage.getItem('usuarioId'));

  useEffect(() => {
    if (id) {
      localStorage.setItem('usuarioId', id);
      setSocioId(id);
    }
  }, [id]);

  const [socio, setSocio] = useState({});
  const [clases, setClases] = useState([]);
  const [error, setError] = useState(null);
  const [disciplinaDetalle, setDisciplinaDetalle] = useState(null);
  const [entrenadorDetalle, setEntrenadorDetalle] = useState(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const responseSocio = await axios.get(`${URL_SOCIOS}/${socioId}`);
        setSocio(responseSocio.data);

        const responseDisciplinas = await axios.get(URL_DISCIPLINAS);
        const disciplinas = responseDisciplinas.data;
        const clasesInscritas = [];

        disciplinas.forEach(disciplina => {
          disciplina.clases.forEach(clase => {
            if (clase.socios.find(socio => socio.id === socioId)) {
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
  }, [socioId]);

  const handleVerMasDetallesDisciplina = async (disciplinaId) => {
    try {
      const responseDisciplina = await axios.get(`${URL_DISCIPLINAS}/${disciplinaId}`);
      setDisciplinaDetalle(responseDisciplina.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerMasDetallesEntrenador = async (entrenadorId) => {
    try {
      const responseEntrenador = await axios.get(`${URL_EMPLEADOS}/${entrenadorId}`);
      setEntrenadorDetalle(responseEntrenador.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelarClase = async (clase) => {
    try {
      const responseDisciplina = await axios.get(`${URL_DISCIPLINAS}/${clase.disciplinaId}`);
      const disciplina = responseDisciplina.data;
      const claseIndex = disciplina.clases.findIndex(c => c.id === clase.clase.id);
      const claseActualizada = disciplina.clases[claseIndex];
      const socioIndex = claseActualizada.socios.findIndex(socio => socio.id === socioId);

      if (socioIndex !== -1) {
        claseActualizada.socios.splice(socioIndex, 1);
        disciplina.clases[claseIndex] = claseActualizada;
        await axios.patch(`${URL_DISCIPLINAS}/${clase.disciplinaId}`, disciplina);
        // Actualizar la lista de clases inscritas
        const responseDisciplinas = await axios.get(URL_DISCIPLINAS);
        const disciplinas = responseDisciplinas.data;
        const clasesInscritas = [];

        disciplinas.forEach(disciplina => {
          disciplina.clases.forEach(clase => {
            if (clase.socios.find(socio => socio.id === socioId)) {
              clasesInscritas.push({
                disciplina: disciplina.nombre,
                disciplinaId: disciplina.id,
                clase: clase,
              });
            }
          });
        });

        setClases(clasesInscritas);
        alert('Inscripción cancelada con éxito');
      } else {
        alert('No estás inscrito en esta clase');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="clases-socio-jose-container">
      <div className="clases-socio-jose-title-container">
        <h1 className="clases-socio-jose-title">Clases inscritas</h1>
      </div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        clases.length === 0 ? (
          <p>No tienes clases inscritas. Visita la página de disciplinas para inscribirte a una o más clases.</p>
        ) : (
          clases.map((clase, index) => (
            <div key={index} className="clases-socio-jose-card">
              <h2 className="clases-socio-jose-card-title">{clase.disciplina}</h2>
              <p className="clases-socio-jose-card-detail">Días: {clase.clase.dias}</p>
              <p className="clases-socio-jose-card-detail">Horarios: {clase.clase.horarios}</p>
              <p className="clases-socio-jose-card-detail">Nivel: {clase.clase.nivel}</p>
              <p className="clases-socio-jose-card-detail">Entrenador: {clase.clase.entrenador.nombre}</p>
              <button className="clases-socio-jose-button-action" onClick={() => handleVerMasDetallesDisciplina(clase.disciplinaId)}>Ver más detalles de la disciplina</button>
              <button className="clases-socio-jose-button-action" onClick={() => handleVerMasDetallesEntrenador(clase.clase.entrenador.id)}>Ver más detalles del entrenador</button>
              <button className="clases-socio-jose-button-delete" onClick={() => handleCancelarClase(clase)}>Cancelar clase</button>
            </div>
          ))
        )
      )}
      {disciplinaDetalle && (
        <div className="clases-socio-jose-modal">
          <div className="clases-socio-jose-modal-content">
            <h2 className="clases-socio-jose-modal-title">Detalles de la disciplina</h2>
            <img src={`/IMAGENES DISCIPLINAS/${disciplinaDetalle.foto}`} alt={disciplinaDetalle.nombre} />
            <p className="clases-socio-jose-modal-detail">Nombre: {disciplinaDetalle.nombre}</p>
            <p className="clases-socio-jose-modal-detail">Categoría: {disciplinaDetalle.categoria}</p>
            <p className="clases-socio-jose-modal-detail">Descripción: {disciplinaDetalle.descripción}</p>
            <p className="clases-socio-jose-modal-detail">Sector: {disciplinaDetalle.sector}</p>
            <button className="clases-socio-jose-modal-button" onClick={() => setDisciplinaDetalle(null)}>Cerrar</button>
          </div>
        </div>
      )}

      {entrenadorDetalle && (
        <div className="clases-socio-jose-modal">
          <div className="clases-socio-jose-modal-content">
            <h2 className="clases-socio-jose-modal-title">Detalles del entrenador</h2>
            <img src={`/ENTRENADORES/${entrenadorDetalle.foto}`} alt={entrenadorDetalle.nombre} />
            <p className="clases-socio-jose-modal-detail">Nombre: {entrenadorDetalle.nombre}</p>
            <p className="clases-socio-jose-modal-detail">Apellido: {entrenadorDetalle.apellido}</p>
            <p className="clases-socio-jose-modal-detail">Edad: {entrenadorDetalle.edad}</p>
            <p className="clases-socio-jose-modal-detail">Email: {entrenadorDetalle.email}</p>
            <p className="clases-socio-jose-modal-detail">Teléfono: {entrenadorDetalle.tel}</p>
            <p className="clases-socio-jose-modal-detail">Descripción: {entrenadorDetalle.descripción}</p>
            <button className="clases-socio-jose-modal-button" onClick={() => setEntrenadorDetalle(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};