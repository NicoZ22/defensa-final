import axios from "axios";
import { URL_DISCIPLINAS } from "../../../utils/endpoints";
import { useState, useEffect } from "react";
import '../../../styles/GESTION ADMIN/editardisciplina.css'

export const EditarDisciplina = ({ disciplina, handleMostrarComponente, actualizarDisciplinas }) => {
  const [editarDisciplina, setEditarDisciplina] = useState(disciplina);
  const [error, setError] = useState(null);

  useEffect(() => {
    setEditarDisciplina(disciplina);
  }, [disciplina]);

  const handleChange = (event) => {
    setEditarDisciplina({ ...editarDisciplina, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${URL_DISCIPLINAS}/${editarDisciplina.id}`, editarDisciplina);
      handleMostrarComponente(null);
      actualizarDisciplinas();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="editar-disciplina-container-amparo">
      <form className="editar-disciplina-form-amparo" onSubmit={handleSubmit}>
        <h1 className="editar-disciplina-title-amparo">Editar Disciplina</h1>
        <div className="editar-disciplina-form-group-amparo">
          <label className="editar-disciplina-form-label-amparo">Nombre:</label>
          <input
            className="editar-disciplina-form-input-amparo"
            type="text"
            name="nombre"
            value={editarDisciplina.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="editar-disciplina-form-group-amparo">
          <label className="editar-disciplina-form-label-amparo">Categoría:</label>
          <input
            className="editar-disciplina-form-input-amparo"
            type="text"
            name="categoria"
            value={editarDisciplina.categoria}
            onChange={handleChange}
          />
        </div>
        <div className="editar-disciplina-form-group-amparo">
          <label className="editar-disciplina-form-label-amparo">Descripción:</label>
          <textarea
            className="editar-disciplina-form-input-amparo"
            name="descripción"
            value={editarDisciplina.descripción}
            onChange={handleChange}
          />
        </div>
        <div className="editar-disciplina-form-group-amparo">
          <label className="editar-disciplina-form-label-amparo">Sector:</label>
          <input
            className="editar-disciplina-form-input-amparo"
            type="text"
            name="sector"
            value={editarDisciplina.sector}
            onChange={handleChange}
          />
        </div>
        <div className="editar-disciplina-form-group-amparo">
          <label className="editar-disciplina-form-label-amparo">Foto:</label>
          <input
            className="editar-disciplina-form-input-amparo"
            type="text"
            name="foto"
            value={editarDisciplina.foto}
            onChange={handleChange}
          />
        </div>
        <button className="editar-disciplina-button-amparo" type="submit">
          Guardar Cambios
        </button>
        {error && <p className="editar-disciplina-error-message-amparo">{error}</p>}
      </form>
    </div>
  );
};