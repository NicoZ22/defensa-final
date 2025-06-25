import React, { useState } from 'react';

const Disciplinas = () => {
  const [diaSeleccionado, setDiaSeleccionado] = useState("");
  const [mostrarDetalles, setMostrarDetalles] = useState(null);

  const disciplinas = [
    {
      id: 1,
      nombre: "Boxeo",
      dias: ["Lunes", "Miércoles"],
      horario: "18:00 a 19:30",
      entrenador: "Juan Pérez"
    },
    {
      id: 2,
      nombre: "CrossFit",
      dias: ["Martes", "Jueves"],
      horario: "19:00 a 20:00",
      entrenador: "Laura Gómez"
    },
    {
      id: 3,
      nombre: "Zumba",
      dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
      horario: "10:00 a 11:00",
      entrenador: "Camila Torres"
    },
    {
      id: 4,
      nombre: "Funcional",
      dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
      horario: "08:00 a 09:00",
      entrenador: "Lucas Martínez"
    },
    {
      id: 5,
      nombre: "Spinning",
      dias: ["Martes", "Jueves"],
      horario: "17:00 a 18:00",
      entrenador: "Sofía Ruiz"
    },
    {
      id: 6,
      nombre: "Yoga",
      dias: ["Miércoles", "Viernes"],
      horario: "16:00 a 17:00",
      entrenador: "Mariana Díaz"
    }
  ];

  const diasDisponibles = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

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
                <p>🕒 Horario: {disciplina.horario}</p>
                <p>🏋️ Profesor/a: {disciplina.entrenador}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Disciplinas;
