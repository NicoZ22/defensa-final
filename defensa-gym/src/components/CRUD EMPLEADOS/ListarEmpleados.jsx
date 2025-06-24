import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

export const ListarEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const obtenerEmpleados = async () => {
      const response = await apiService.empleados.getAll();
      setEmpleados(response);
    };
    obtenerEmpleados();
  }, []);

  const handleVerDetalles = (empleado) => {
    setEmpleadoSeleccionado(empleado);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setEmpleadoSeleccionado(null);
  };

  return (
    <div className="container mx-auto p-4 mt-4 bg-gray-100/50 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-red-500/80">Empleados</h2>
        <button className="bg-green-500/80 hover:bg-green-700/80 text-white font-bold py-2 px-4 rounded">
          Crear Empleado
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
            {empleados.map((empleado) => (
              <tr key={empleado.id} className="even:bg-gray-100/50 odd:bg-white">
                <td className="border px-4 py-2 border-gray-400/80 w-1/4">{empleado.nombre}</td>
                <td className="border px-4 py-2 border-gray-400/80 w-1/4">{empleado.apellido}</td>
                <td className="border px-4 py-2 border-gray-400/80 w-1/3">{empleado.email}</td>
                <td className="border px-4 py-2 border-gray-400/80 w-1/6">
                  <div className="flex justify-around">
                    <button
                      onClick={() => handleVerDetalles(empleado)}
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
      {mostrarModal && empleadoSeleccionado && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md border-2 w-1/2">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-red-500/80">Detalles del empleado</h3>
              <button onClick={cerrarModal} className="bg-red-500/80 hover:bg-red-700/80 text-white font-bold p-2 rounded">
                Cerrar
              </button>
            </div>
            <p className="mb-2">
              <span className="font-bold">Nombre:</span> {empleadoSeleccionado.nombre}
            </p>
            <hr className="border-gray-300 my-2" />
            <p className="mb-2">
              <span className="font-bold">Apellido:</span> {empleadoSeleccionado.apellido}
            </p>
            <hr className="border-gray-300 my-2" />
            <p className="mb-2">
              <span className="font-bold">Edad:</span> {empleadoSeleccionado.edad}
            </p>
            <hr className="border-gray-300 my-2" />
            <p className="mb-2">
              <span className="font-bold">Email:</span> {empleadoSeleccionado.email}
            </p>
            <hr className="border-gray-300 my-2" />
            <p className="mb-2">
              <span className="font-bold">Teléfono:</span> {empleadoSeleccionado.tel}
            </p>
            <hr className="border-gray-300 my-2" />
            <p className="mb-2">
              <span className="font-bold">DNI:</span> {empleadoSeleccionado.dni}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};