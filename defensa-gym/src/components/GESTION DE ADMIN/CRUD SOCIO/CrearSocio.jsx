import { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_SOCIOS } from '../../../utils/endpoints';
import { generarID } from '../../../utils/generarID';
import '../../../styles/GESTION ADMIN/crearsocio.css'

export const CrearSocio = (props) => {
  const [socios, setSocios] = useState([]);
  const [socio, setSocio] = useState({
    rol: 'socio',
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
    const obtenerSocios = async () => {
      try {
        const respuesta = await axios.get(URL_SOCIOS);
        setSocios(respuesta.data);
      } catch (error) {
        setError(error.message);
      }
    };
    obtenerSocios();
  }, []);

  const handleChange = (event) => {
    setSocio({ ...socio, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!socio.nombre || !socio.apellido || !socio.edad || !socio.email || !socio.tel || !socio.dni || !socio.contraseña) {
      setError('Por favor, complete todos los campos');
      return;
    }
    const socioExistenteEmail = socios.find((s) => s.email === socio.email);
    const socioExistenteDni = socios.find((s) => s.dni === socio.dni);
    const socioExistenteTelefono = socios.find((s) => s.tel === socio.tel);
    if (socioExistenteEmail || socioExistenteDni || socioExistenteTelefono) {
      setError('El email, dni o teléfono ya existe');
      return;
    }
    try {
      const nuevoSocio = { id: generarID(socios), ...socio };
      const crearSocio = await axios.post(URL_SOCIOS, nuevoSocio);
      props.obtenerSocios();
      setSocios([...socios, crearSocio.data]);
      setError(null);
      setSocio({
        rol: 'socio',
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
    <div className="crear-socio-container-nico">
      <form className="crear-socio-form-nico" onSubmit={handleSubmit}>
        <h1 className="crear-socio-title-nico">Crear Socio</h1>
        <div className="crear-socio-form-group-nico">
          <label className="crear-socio-form-label-nico">Nombre:</label>
          <input className="crear-socio-form-input-nico" type="text" name="nombre" value={socio.nombre} onChange={handleChange} />
        </div>
        <div className="crear-socio-form-group-nico">
          <label className="crear-socio-form-label-nico">Apellido:</label>
          <input className="crear-socio-form-input-nico" type="text" name="apellido" value={socio.apellido} onChange={handleChange} />
        </div>
        <div className="crear-socio-form-group-nico">
          <label className="crear-socio-form-label-nico">Edad:</label>
          <input className="crear-socio-form-input-nico" type="number" name="edad" value={socio.edad} onChange={handleChange} />
        </div>
        <div className="crear-socio-form-group-nico">
          <label className="crear-socio-form-label-nico">Email:</label>
          <input className="crear-socio-form-input-nico" type="email" name="email" value={socio.email} onChange={handleChange} />
        </div>
        <div className="crear-socio-form-group-nico">
          <label className="crear-socio-form-label-nico">Teléfono:</label>
          <input className="crear-socio-form-input-nico" type="text" name="tel" value={socio.tel} onChange={handleChange} />
        </div>
        <div className="crear-socio-form-group-nico">
          <label className="crear-socio-form-label-nico">DNI:</label>
          <input className="crear-socio-form-input-nico" type="text" name="dni" value={socio.dni} onChange={handleChange} />
        </div>
        <div className="crear-socio-form-group-nico">
          <label className="crear-socio-form-label-nico">Contraseña:</label>
          <input className="crear-socio-form-input-nico" type="password" name="contraseña" value={socio.contraseña} onChange={handleChange} />
        </div>
        <button className="crear-socio-button-nico" type="submit">Crear</button>
        {error && <p className="crear-socio-error-message-nico">{error}</p>}
      </form>
    </div>
  );
};