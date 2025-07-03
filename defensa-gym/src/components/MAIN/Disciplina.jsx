import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_DISCIPLINAS, URL_SOCIOS, URL_EMPLEADOS } from '../../utils/endpoints';
import '../../styles/MAIN/disciplina.css';
import { generarID } from '../../utils/generarID';

export const Disciplina = () => {
  const usuarioId = localStorage.getItem('usuarioId');
  const rol = localStorage.getItem('rol');
  const [disciplinas, setDisciplinas] = useState([]);
  const [disciplinaDetalle, setDisciplinaDetalle] = useState(null);
  const [entrenadores, setEntrenadores] = useState([]);
  const [entrenadorDetalle, setEntrenadorDetalle] = useState(null);
  const [empleado, setEmpleado] = useState(null);
  const [modalCrearClase, setModalCrearClase] = useState(false);
  const [disciplinaIdModal, setDisciplinaIdModal] = useState(null);
  const [claseInfo, setClaseInfo] = useState({
    dias: '',
    horarios: '',
    nivel: ''
  });

  useEffect(() => {
    const obtenerDisciplinas = async () => {
      try {
        const responseDisciplinas = await axios.get(URL_DISCIPLINAS);
        setDisciplinas(responseDisciplinas.data);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerDisciplinas();

    if (rol === 'empleado') {
      const obtenerEmpleado = async () => {
        try {
          const responseEmpleado = await axios.get(`${URL_EMPLEADOS}/${usuarioId}`);
          setEmpleado(responseEmpleado.data);
        } catch (error) {
          console.error(error);
        }
      };

      obtenerEmpleado();
    }
  }, []);

  const handleVerMasDetallesDisciplina = async (disciplinaId) => {
    try {
      const responseDisciplina = await axios.get(`${URL_DISCIPLINAS}/${disciplinaId}`);
      setDisciplinaDetalle(responseDisciplina.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerEntrenadores = async (disciplinaId) => {
    try {
      const responseDisciplina = await axios.get(`${URL_DISCIPLINAS}/${disciplinaId}`);
      const entrenadores = responseDisciplina.data.clases.map(clase => ({...clase.entrenador, claseId: clase.id, disciplinaId: responseDisciplina.data.id}));
      setEntrenadores(entrenadores);
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

  const handleInscribirse = async (claseId, disciplinaId) => {
    try {
      const responseDisciplina = await axios.get(`${URL_DISCIPLINAS}/${disciplinaId}`);
      const disciplina = responseDisciplina.data;
      const claseIndex = disciplina.clases.findIndex(clase => clase.id === claseId);
      const clase = disciplina.clases[claseIndex];
      const socioInscrito = clase.socios.find(socio => socio.id === usuarioId);

      if (socioInscrito) {
        alert('Ya estás inscrito en esta clase');
        return;
      }

      const responseSocio = await axios.get(`${URL_SOCIOS}/${usuarioId}`);
      const socio = responseSocio.data;

      clase.socios.push({ id: usuarioId, nombre: `${socio.nombre} ${socio.apellido}` });
      await axios.patch(`${URL_DISCIPLINAS}/${disciplinaId}`, disciplina);
      alert('Inscripción exitosa');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCrearClase = async () => {
    try {
      const responseDisciplina = await axios.get(`${URL_DISCIPLINAS}/${disciplinaIdModal}`);
      const disciplina = responseDisciplina.data;
      const claseExistente = disciplina.clases.find(clase => clase.entrenador && clase.entrenador.id === usuarioId);

      if (claseExistente) {
        alert('Ya estás enseñando una clase en esta disciplina');
        return;
      }

      const idClase = generarID(disciplina.clases);
      const nuevaClase = {
        id: idClase,
        entrenador: { id: usuarioId, nombre: `${empleado.nombre} ${empleado.apellido}` },
        socios: [],
        dias: claseInfo.dias,
        horarios: claseInfo.horarios,
        nivel: claseInfo.nivel
      };
      disciplina.clases.push(nuevaClase);
      await axios.patch(`${URL_DISCIPLINAS}/${disciplinaIdModal}`, disciplina);
      setModalCrearClase(false);
      alert('Clase creada con éxito');
    } catch (error) {
      console.error(error);
    }
  };

  const abrirModalCrearClase = (disciplinaId) => {
    setDisciplinaIdModal(disciplinaId);
    setModalCrearClase(true);
  };

  return (
    <div className="disciplina-juan-container">
      {disciplinas.map(disciplina => (
        <div key={disciplina.id} className="disciplina-juan-card">
          <div className="disciplina-juan-card-content">
            <h2 className="disciplina-juan-card-title">{disciplina.nombre}</h2>
            <p className="disciplina-juan-card-detail">{disciplina.descripción}</p>
          </div>
          <div className="disciplina-juan-card-buttons">
            <button className="disciplina-juan-button-action" onClick={() => handleVerMasDetallesDisciplina(disciplina.id)}>Ver más detalles</button>
            {rol === 'socio' && (
              <button className="disciplina-juan-button-action" onClick={() => handleVerEntrenadores(disciplina.id)}>Ver entrenadores</button>
            )}
            {rol === 'empleado' && (
              <button className="disciplina-juan-button-action" onClick={() => abrirModalCrearClase(disciplina.id)}>Crear clase</button>
            )}
          </div>
        </div>
      ))}

      {disciplinaDetalle && (
        <div className="disciplina-juan-modal">
          <div className="disciplina-juan-modal-content">
            <h2 className="disciplina-juan-modal-title">Detalles de la disciplina</h2>
            <img src={`/IMAGENES DISCIPLINAS/${disciplinaDetalle.foto}`} alt={disciplinaDetalle.nombre} />
            <p className="disciplina-juan-modal-detail">Nombre: {disciplinaDetalle.nombre}</p>
            <p className="disciplina-juan-modal-detail">Categoría: {disciplinaDetalle.categoria}</p>
            <p className="disciplina-juan-modal-detail">Descripción: {disciplinaDetalle.descripción}</p>
            <p className="disciplina-juan-modal-detail">Sector: {disciplinaDetalle.sector}</p>
            <button className="disciplina-juan-modal-button" onClick={() => setDisciplinaDetalle(null)}>Cerrar</button>
          </div>
        </div>
      )}

      {entrenadores.length > 0 && (
        <div>
          <h2>Entrenadores</h2>
          {entrenadores.map(entrenador => (
            <div key={entrenador.id}>
              <p>Nombre: {entrenador.nombre}</p>
              <button className="disciplina-juan-button-action" onClick={() => handleVerMasDetallesEntrenador(entrenador.id)}>Ver más detalles</button>
              <button className="disciplina-juan-button-action" onClick={() => handleInscribirse(entrenador.claseId, entrenador.disciplinaId)}>Inscribirse</button>
            </div>
          ))}
        </div>
      )}

      {entrenadorDetalle && (
        <div className="disciplina-juan-modal">
          <div className="disciplina-juan-modal-content">
            <h2 className="disciplina-juan-modal-title">Detalles del entrenador</h2>
            <img src={`/ENTRENADORES/${entrenadorDetalle.foto}`} alt={entrenadorDetalle.nombre} />
            <p className="disciplina-juan-modal-detail">Nombre: {entrenadorDetalle.nombre}</p>
            <p className="disciplina-juan-modal-detail">Apellido: {entrenadorDetalle.apellido}</p>
            <p className="disciplina-juan-modal-detail">Edad: {entrenadorDetalle.edad}</p>
            <p className="disciplina-juan-modal-detail">Email: {entrenadorDetalle.email}</p>
            <p className="disciplina-juan-modal-detail">Teléfono: {entrenadorDetalle.tel}</p>
            <p className="disciplina-juan-modal-detail">Descripción: {entrenadorDetalle.descripción}</p>
            <button className="disciplina-juan-modal-button" onClick={() => setEntrenadorDetalle(null)}>Cerrar</button>
          </div>
        </div>
      )}

      {modalCrearClase && (
        <div className="clases-empleado-juan-modal">
          <div className="clases-empleado-juan-modal-content">
            <h2 className="clases-empleado-juan-modal-title">Crear clase</h2>
            <div className="clases-empleado-juan-modal-form-group">
              <label className="clases-empleado-juan-modal-form-label">Días:</label>
              <input className="clases-empleado-juan-modal-form-input" type="text" value={claseInfo.dias} onChange={(e) => setClaseInfo({...claseInfo, dias: e.target.value})} />
            </div>
            <div className="clases-empleado-juan-modal-form-group">
              <label className="clases-empleado-juan-modal-form-label">Horarios:</label>
              <input className="clases-empleado-juan-modal-form-input" type="text" value={claseInfo.horarios} onChange={(e) => setClaseInfo({...claseInfo, horarios: e.target.value})} />
            </div>
            <div className="clases-empleado-juan-modal-form-group">
              <label className="clases-empleado-juan-modal-form-label">Nivel:</label>
              <input className="clases-empleado-juan-modal-form-input" type="text" value={claseInfo.nivel} onChange={(e) => setClaseInfo({...claseInfo, nivel: e.target.value})} />
            </div>
            <button className="clases-empleado-juan-modal-button" onClick={handleCrearClase}>Crear clase</button>
            <button className="clases-empleado-juan-modal-button" onClick={() => setModalCrearClase(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};