import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

export const ListarDisciplinas = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [disciplinaSeleccionada, setDisciplinaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const obtenerDisciplinas = async () => {
      const response = await apiService.disciplinas.getAll();
      setDisciplinas(response);
    };
    obtenerDisciplinas();
  }, []);

  const handleVerDetalles = (disciplina) => {
    setDisciplinaSeleccionada(disciplina);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setDisciplinaSeleccionada(null);
  };

  return (
    <div className="container mx-auto p-4 mt-4 bg-gray-100/50 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-red-500/80">Disciplinas</h2>
        <button className="bg-green-500/80 hover:bg-green-700/80 text-white font-bold py-2 px-4 rounded">
          Crear Disciplina
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-400/80">
          <thead>
            <tr className="bg-gray-200/80">
              <th className="w-1/4 px-4 py-2 border border-gray-400/80">Nombre</th>
              <th className="w-1/3 px-4 py-2 border border-gray-400/80">Descripción</th>
              <th className="w-1/6 px-4 py-2 border border-gray-400/80">Días</th>
              <th className="w-1/6 px-4 py-2 border border-gray-400/80">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {disciplinas.map((disciplina) => (
              <tr key={disciplina.id} className="even:bg-gray-100/50 odd:bg-white">
                <td className="border px-4 py-2 border-gray-400/80 w-1/4">{disciplina.nombre}</td>
                <td className="border px-4 py-2 border-gray-400/80 w-1/3">{disciplina.descripcion}</td>
                <td className="border px-4 py-2 border-gray-400/80 w-1/6">{disciplina.dias.join(', ')}</td>
                <td className="border px-4 py-2 border-gray-400/80 w-1/6">
                  <div className="flex justify-around">
                    <button
                      onClick={() => handleVerDetalles(disciplina)}
                      className="bg-blue-500/80 hover:bg-blue-700/80 text-white font-bold p-2 mr-1 w-36 rounded"
                    >
                      Ver detalles
                    </button>
                    <button className="bg-yellow-500/80 hover:bg-yellow-700/80 text-white font-bold p-2 mr-1 rounded">
                      Editar
                    </button>
                    <button className="bg-red-500/80 hover:bg-red-700/80 text-white font-bold p-2 rounded">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {mostrarModal && disciplinaSeleccionada && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md border-2 w-1/2">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-red-500/80">Detalles de la disciplina</h3>
              <button onClick={cerrarModal} className="bg-red-500/80 hover:bg-red-700/80 text-white font-bold p-2 rounded">
                Cerrar
              </button>
            </div>
            <p className="mb-2">
              <span className="font-bold">Nombre:</span> {disciplinaSeleccionada.nombre}
            </p>
            <hr className="border-gray-300 my-2" />
            <p className="mb-2">
              <span className="font-bold">Descripción:</span> {disciplinaSeleccionada.descripcion}
            </p>
            <hr className="border-gray-300 my-2" />
            <p className="mb-2">
              <span className="font-bold">Categoría:</span> {disciplinaSeleccionada.categoria}
            </p>
            <hr className="border-gray-300 my-2" />
            <p className="mb-2">
              <span className="font-bold">Nivel:</span> {disciplinaSeleccionada.nivel}
            </p>
            <hr className="border-gray-300 my-2" />
            <p className="mb-2">
              <span className="font-bold">Días:</span> {disciplinaSeleccionada.dias.join(', ')}
            </p>
            <hr className="border-gray-300 my-2" />
            <p className="mb-2">
              <span className="font-bold">Horario:</span> {disciplinaSeleccionada.horario}
            </p>
            <hr className="border-gray-300 my-2" />
            <p className="mb-2">
              <span className="font-bold">Profesor:</span> {disciplinaSeleccionada.profesor}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};