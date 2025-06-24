import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { ListarSocios } from '../CRUD SOCIOS/ListarSocios';
import { ListarEmpleados } from '../CRUD EMPLEADOS/ListarEmpleados';
import { ListarDisciplinas } from '../CRUD DISCIPLINAS/ListarDisciplinas';

export const Dueño = () => {
  const [sociosCount, setSociosCount] = useState(0);
  const [empleadosCount, setEmpleadosCount] = useState(0);
  const [disciplinasCount, setDisciplinasCount] = useState(0);
  const [mostrarComponente, setMostrarComponente] = useState(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      const sociosResponse = await apiService.socios.getAll();
      setSociosCount(sociosResponse.length);

      const empleadosResponse = await apiService.empleados.getAll();
      setEmpleadosCount(empleadosResponse.length);

      const disciplinasResponse = await apiService.disciplinas.getAll();
      setDisciplinasCount(disciplinasResponse.length);
    };
    obtenerDatos();
  }, []);

  const handleMostrarComponente = (componente) => {
    setMostrarComponente(componente);
  };

  return (
    <div className="container mx-auto p-4 mt-4 bg-gray-50/80 rounded-lg shadow-md shadow-red-700">
      <h1 className="text-3xl font-bold mb-4 text-red-500/80">Dashboard de Dueño</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow-md shadow-red-700">
          <h2 className="text-xl font-bold mb-2 text-red-500/80">Socios</h2>
          <p className="text-lg">Total de socios: {sociosCount}</p>
          <button
            onClick={() => handleMostrarComponente('socios')}
            className="bg-red-500/80 hover:bg-red-700/80 text-red-200/80 font-bold py-2 px-4 rounded"
          >
            Listar Socios
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md shadow-red-700">
          <h2 className="text-xl font-bold mb-2 text-red-500/80">Empleados</h2>
          <p className="text-lg">Total de empleados: {empleadosCount}</p>
          <button
            onClick={() => handleMostrarComponente('empleados')}
            className="bg-red-500/80 hover:bg-red-700/80 text-red-200/80 font-bold py-2 px-4 rounded"
          >
            Listar Empleados
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md shadow-red-700">
          <h2 className="text-xl font-bold mb-2 text-red-500/80">Disciplinas</h2>
          <p className="text-lg">Total de disciplinas: {disciplinasCount}</p>
          <button
            onClick={() => handleMostrarComponente('disciplinas')}
            className="bg-red-500/80 hover:bg-red-700/80 text-red-200/80 font-bold py-2 px-4 rounded"
          >
            Listar Disciplinas
          </button>
        </div>
      </div>
      {mostrarComponente && (
        <div className="w-full bg-gray-50 rounded">
          {mostrarComponente === 'socios' && <ListarSocios />}
          {mostrarComponente === 'empleados' && <ListarEmpleados />}
          {mostrarComponente === 'disciplinas' && <ListarDisciplinas />}
        </div>
      )}
    </div>
  );
};