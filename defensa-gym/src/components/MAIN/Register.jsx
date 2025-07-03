import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/MAIN/register.css'
import { URL_SOCIOS } from '../../utils/endpoints';
import { generarID } from '../../utils/generarID';

export const Register = () => {
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
    if ( !socio.nombre || !socio.apellido || !socio.edad || !socio.email || !socio.tel || !socio.dni || !socio.contraseña) {
      if (isNaN(socio.edad) || socio.edad <= 0) {
        setError('La edad no puede ser negativa ni cero. Por favor, ingrese una edad válida.');
      } else {
        setError('Por favor, complete todos los campos correctamente');
      }
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
    <div className="register-nico-container">
      <form className="register-nico-form" onSubmit={handleSubmit}>
        <h1 className="register-nico-title">Registrar Socio</h1>
        <div className="register-nico-form-group">
          <label className="register-nico-form-label">Nombre:</label>
            <input className="register-nico-form-input" type="text" name="nombre" value={socio.nombre} onChange={handleChange} />
        </div>
        <div className="register-nico-form-group">
          <label className="register-nico-form-label">Apellido:</label>
          <input className="register-nico-form-input" type="text" name="apellido" value={socio.apellido} onChange={handleChange} />
        </div>
        <div className="register-nico-form-group">
          <label className="register-nico-form-label">Edad:</label>
          <input className="register-nico-form-input" type="number" name="edad" value={socio.edad} onChange={handleChange} />
        </div>
        <div className="register-nico-form-group">
          <label className="register-nico-form-label">Email:</label>
          <input className="register-nico-form-input" type="email" name="email" value={socio.email} onChange={handleChange} />
        </div>
        <div className="register-nico-form-group">
          <label className="register-nico-form-label">Teléfono:</label>
          <input className="register-nico-form-input" type="text" name="tel" value={socio.tel} onChange={handleChange} />
        </div>
        <div className="register-nico-form-group">
          <label className="register-nico-form-label">DNI:</label>
          <input className="register-nico-form-input" type="text" name="dni" value={socio.dni} onChange={handleChange} />
        </div>
        <div className="register-nico-form-group">
          <label className="register-nico-form-label">Contraseña:</label>
          <input className="register-nico-form-input" type="password" name="contraseña" value={socio.contraseña} onChange={handleChange} />
        </div>
        <button className="register-nico-button" type="submit">Registrar</button>
        {error && <p className="register-nico-error-message">{error}</p>}
      </form>
    </div>
  );
};