import { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_DISCIPLINAS } from '../../../utils/endpoints';
import { generarID } from '../../../utils/generarID';
import '../../../styles/GESTION ADMIN/creardisciplina.css'

export const CrearDisciplina = (props) => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [disciplina, setDisciplina] = useState({
    categoria: '',
    nombre: '',
    descripción: '',
    foto: '',
    sector: '',
    clases: []
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerDisciplinas = async () => {
      try {
        const respuesta = await axios.get(URL_DISCIPLINAS);
        setDisciplinas(respuesta.data);
      } catch (error) {
        setError(error.message);
      }
    };
    obtenerDisciplinas();
  }, []);

  const handleChange = (event) => {
    setDisciplina({ ...disciplina, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!disciplina.nombre || !disciplina.descripción || !disciplina.categoria || !disciplina.sector || !disciplina.foto) {
      setError('Por favor, complete todos los campos');
      return;
    }
    const disciplinaExistente = disciplinas.find((d) => d.nombre === disciplina.nombre);
    if (disciplinaExistente) {
      setError('La disciplina ya existe');
      return;
    }
    try {
      const nuevaDisciplina = { id: generarID(disciplinas), ...disciplina };
      const crearDisciplina = await axios.post(URL_DISCIPLINAS, nuevaDisciplina);
      props.obtenerDisciplinas();
      setDisciplinas([...disciplinas, crearDisciplina.data]);
      setError(null);
      setDisciplina({
        categoria: '',
        nombre: '',
        descripción: '',
        foto: '',
        sector: '',
        clases: []
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="crear-disciplina-container-amparo">
      <form className="crear-disciplina-form-amparo" onSubmit={handleSubmit}>
        <h1 className="crear-disciplina-title-amparo">Crear Disciplina</h1>
        <div className="crear-disciplina-form-group-amparo">
          <label className="crear-disciplina-form-label-amparo">Nombre:</label>
          <input className="crear-disciplina-form-input-amparo" type="text" name="nombre" value={disciplina.nombre} onChange={handleChange} />
        </div>
        <div className="crear-disciplina-form-group-amparo">
          <label className="crear-disciplina-form-label-amparo">Categoría:</label>
          <input className="crear-disciplina-form-input-amparo" type="text" name="categoria" value={disciplina.categoria} onChange={handleChange} />
        </div>
        <div className="crear-disciplina-form-group-amparo">
          <label className="crear-disciplina-form-label-amparo">Descripción:</label>
          <textarea className="crear-disciplina-form-input-amparo" name="descripción" value={disciplina.descripción} onChange={handleChange} />
        </div>
        <div className="crear-disciplina-form-group-amparo">
          <label className="crear-disciplina-form-label-amparo">Sector:</label>
          <input className="crear-disciplina-form-input-amparo" type="text" name="sector" value={disciplina.sector} onChange={handleChange} />
        </div>
        <div className="crear-disciplina-form-group-amparo">
          <label className="crear-disciplina-form-label-amparo">Foto:</label>
          <input className="crear-disciplina-form-input-amparo" type="text" name="foto" value={disciplina.foto} onChange={handleChange} />
        </div>
        <button className="crear-disciplina-button-amparo" type="submit">Crear</button>
        {error && <p className="crear-disciplina-error-message-amparo">{error}</p>}
      </form>
    </div>
  );
};