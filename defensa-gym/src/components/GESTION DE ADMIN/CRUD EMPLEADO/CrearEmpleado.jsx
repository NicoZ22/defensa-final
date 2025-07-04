import { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_EMPLEADOS } from '../../../utils/endpoints';
import { generarID } from '../../../utils/generarID';
import '../../../styles/GESTION ADMIN/crearEmpleado.css'

export const CrearEmpleado = (props) => {
  const [empleados, setEmpleados] = useState([]);
  const [empleado, setEmpleado] = useState({
    rol: 'empleado',
    contraseña: '',
    nombre: '',
    apellido: '',
    edad: '',
    email: '',
    tel: '',
    dni: '',
    foto: '',
    descripción: '',
    redes: []
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerEmpleados = async () => {
      try {
        const respuesta = await axios.get(URL_EMPLEADOS);
        setEmpleados(respuesta.data);
      } catch (error) {
        setError(error.message);
      }
    };
    obtenerEmpleados();
  }, []);

  const handleChange = (event) => {
    setEmpleado({ ...empleado, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!empleado.nombre || !empleado.apellido || !empleado.edad || !empleado.email || !empleado.tel || !empleado.dni || !empleado.contraseña) {
      setError('Por favor, complete todos los campos');
      return;
    }
    const empleadoExistenteEmail = empleados.find((e) => e.email === empleado.email);
    const empleadoExistenteDni = empleados.find((e) => e.dni === empleado.dni);
    const empleadoExistenteTelefono = empleados.find((e) => e.tel === empleado.tel);
    if (empleadoExistenteEmail || empleadoExistenteDni || empleadoExistenteTelefono) {
      setError('El email, dni o teléfono ya existe');
      return;
    }
    try {
      const nuevoEmpleado = { id: generarID(empleados), ...empleado };
      const crearEmpleado = await axios.post(URL_EMPLEADOS, nuevoEmpleado);
      props.obtenerEmpleados();
      setEmpleados([...empleados, crearEmpleado.data]);
      setError(null);
      setEmpleado({
        rol: 'empleado',
        contraseña: '',
        nombre: '',
        apellido: '',
        edad: '',
        email: '',
        tel: '',
        dni: '',
        foto: '',
        descripción: '',
        redes: []
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="crear-empleado-container-efra">
      <form className="crear-empleado-form-efra" onSubmit={handleSubmit}>
        <h1 className="crear-empleado-title-efra">Crear Empleado</h1>
        <div className="crear-empleado-form-group-efra">
          <label className="crear-empleado-form-label-efra">Nombre:</label>
          <input className="crear-empleado-form-input-efra" type="text" name="nombre" value={empleado.nombre} onChange={handleChange} />
        </div>
        <div className="crear-empleado-form-group-efra">
          <label className="crear-empleado-form-label-efra">Apellido:</label>
          <input className="crear-empleado-form-input-efra" type="text" name="apellido" value={empleado.apellido} onChange={handleChange} />
        </div>
        <div className="crear-empleado-form-group-efra">
          <label className="crear-empleado-form-label-efra">Edad:</label>
          <input className="crear-empleado-form-input-efra" type="number" name="edad" value={empleado.edad} onChange={handleChange} />
        </div>
        <div className="crear-empleado-form-group-efra">
          <label className="crear-empleado-form-label-efra">Email:</label>
          <input className="crear-empleado-form-input-efra" type="email" name="email" value={empleado.email} onChange={handleChange} />
        </div>
        <div className="crear-empleado-form-group-efra">
          <label className="crear-empleado-form-label-efra">Teléfono:</label>
          <input className="crear-empleado-form-input-efra" type="text" name="tel" value={empleado.tel} onChange={handleChange} />
        </div>
        <div className="crear-empleado-form-group-efra">
          <label className="crear-empleado-form-label-efra">DNI:</label>
          <input className="crear-empleado-form-input-efra" type="text" name="dni" value={empleado.dni} onChange={handleChange} />
        </div>
        <div className="crear-empleado-form-group-efra">
          <label className="crear-empleado-form-label-efra">Contraseña:</label>
          <input className="crear-empleado-form-input-efra" type="password" name="contraseña" value={empleado.contraseña} onChange={handleChange} />
        </div>
        <button className="crear-empleado-button-efra" type="submit">Crear</button>
        {error && <p className="crear-empleado-error-message-efra">{error}</p>}
      </form>
    </div>
  );
};