import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

export const ListarSocios = () => {
  const [socios, setSocios] = useState([]);
  const [socioSeleccionado, setSocioSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const obtenerSocios = async () => {
      const response = await apiService.socios.getAll();
      setSocios(response);
    };
    obtenerSocios();
  }, []);

  const handleVerDetalles = (socio) => {
    setSocioSeleccionado(socio);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setSocioSeleccionado(null);
  };

  return (
    <div className="container mx-auto p-4 mt-4 bg-gray-100/50 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-red-500/80">Socios</h2>
        <button className="bg-green-500/80 hover:bg-green-700/80 text-white font-bold py-2 px-4 rounded">
          Crear Socio
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-400/80">
          <thead>
            <tr className="bg-gray-200/80">
              <th className="w-1/4 px-4 py-2 border border-gray-400/80">Nombre</th>
              <th className="w-1/4 px-4 py-2 border border-gray-400/80">Apellido</th>
              <th className="w-1/3 px-4 py-2 border border-gray-400/80">Email</th>
              <th className="w-1/6 px-4 py-2 border border-gray-400/80">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {socios.map((socio) => (
              <tr key={socio.id} className={`${socioSeleccionado && socioSeleccionado.id === socio.id ? 'bg-red-200/50 border-red-500 border-2' : 'even:bg-gray-100/50 odd:bg-white'} border border-gray-400/80`}>
                <td className="border px-4 py-2 border-gray-400/80 w-1/4">{socio.nombre}</td>
                <td className="border px-4 py-2 border-gray-400/80 w-1/4">{socio.apellido}</td>
                <td className="border px-4 py-2 border-gray-400/80 w-1/3">{socio.email}</td>
                <td className="border px-4 py-2 border-gray-400/80 w-1/6">
                  <div className="flex">
                    <button
                      onClick={() => handleVerDetalles(socio)}
                      className="bg-blue-500/80 hover:bg-blue-700/80 text-white font-bold p-2 w-36 mr-1 rounded"
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
      {mostrarModal && socioSeleccionado && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md border-2 w-1/2">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-red-500/80">Detalles del socio</h3>
              <button onClick={cerrarModal} className="bg-red-500/80 hover:bg-red-700/80 text-white font-bold p-2 rounded">
                Cerrar
              </button>
            </div>
            <p className="mb-2">
              <span className="font-bold">Nombre:</span> {socioSeleccionado.nombre}
            </p>
            <hr className="border-gray-300 my-2" />
            <p className="mb-2">
              <span className="font-bold">Apellido:</span> {socioSeleccionado.apellido}
            </p>
            <hr className="border-gray-300 my-2" />
            <p className="mb-2">
              <span className="font-bold">Edad:</span> {socioSeleccionado.edad}
            </p>
            <hr className="border-gray-300 my-2" />
            <p className="mb-2">
              <span className="font-bold">Email:</span> {socioSeleccionado.email}
            </p>
            <hr className="border-gray-300 my-2" />
            <p className="mb-2">
              <span className="font-bold">Teléfono:</span> {socioSeleccionado.tel}
            </p>
            <hr className="border-gray-300 my-2" />
            <p className="mb-2">
              <span className="font-bold">DNI:</span> {socioSeleccionado.dni}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};