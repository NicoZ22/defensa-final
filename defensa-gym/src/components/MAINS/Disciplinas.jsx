import { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

export const Disciplinas = () => {
  const [diaSeleccionado, setDiaSeleccionado] = useState("");
  const [mostrarDetalles, setMostrarDetalles] = useState(null);
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    const obtenerDisciplinas = async () => {
      const response = await apiService.disciplinas.getAll();
      setDisciplinas(response);
    };
    obtenerDisciplinas();
  }, []);

  const diasDisponibles = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  const disciplinasFiltradas = diaSeleccionado
    ? disciplinas.filter(d => d.dias.includes(diaSeleccionado))
    : disciplinas;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Disciplinas</h2>

      <div className="mb-4 flex gap-2 flex-wrap justify-center">
        <button
          className={`px-4 py-1 rounded border ${diaSeleccionado === "" ? "bg-blue-600 text-white" : "bg-white"}`}
          onClick={() => setDiaSeleccionado("")}
        >
          Todos
        </button>
        {diasDisponibles.map(dia => (
          <button
            key={dia}
            className={`px-4 py-1 rounded border ${diaSeleccionado === dia ? "bg-blue-600 text-white" : "bg-white"}`}
            onClick={() => setDiaSeleccionado(dia)}
          >
            {dia}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {disciplinasFiltradas.map(disciplina => (
          <div key={disciplina.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{disciplina.nombre}</h3>
            <p className="text-gray-700">🗓️ Días: {disciplina.dias.join(", ")}</p>
            <p className="text-gray-700">🕒 Horario: {disciplina.horario}</p>
            <button
              className="mt-2 text-sm text-blue-600 hover:underline"
              onClick={() =>
                setMostrarDetalles(mostrarDetalles === disciplina.id ? null : disciplina.id)
              }
            >
              {mostrarDetalles === disciplina.id ? "Ocultar detalles" : "Ver detalles"}
            </button>
            {mostrarDetalles === disciplina.id && (
              <div className="mt-2 text-sm text-gray-600">
                <p>📝 Descripción: {disciplina.descripcion}</p>
                <p>🏋️ Profesor/a: {disciplina.profesor}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};