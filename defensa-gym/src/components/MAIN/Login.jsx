import { useNavigate } from "react-router-dom";
import { ADMIN, EMPLEADO, SOCIO } from "../../routes/path";
import { URL_ADMINS, URL_EMPLEADOS, URL_SOCIOS } from "../../utils/endpoints";
import { useState } from "react";
import '../../styles/MAIN/login.css'
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const adminsResponse = await axios.get(URL_ADMINS);
      const empleadosResponse = await axios.get(URL_EMPLEADOS);
      const sociosResponse = await axios.get(URL_SOCIOS);

      const admins = adminsResponse.data;
      const empleados = empleadosResponse.data;
      const socios = sociosResponse.data;

      const usuarios = [...admins, ...socios, ...empleados];
      const usuario = usuarios.find((u) => u.email === email && u.contraseña === contraseña);

      if (usuario) {
        localStorage.setItem('usuarioId', usuario.id);
        localStorage.setItem('rol', usuario.rol);
        switch (usuario.rol) {
          case 'admin':
            navigate(`${ADMIN}/${usuario.id}`);
            break;
          case 'socio':
            navigate(`${SOCIO}/${usuario.id}`);
            break;
          case 'empleado':
            navigate(`${EMPLEADO}/${usuario.id}`);
            break;
          default:
            setError('Rol no reconocido');
            break;
        }
      } else {
        setError('Datos incorrectos');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-nico-container">
      <form className="login-nico-form" onSubmit={handleSubmit}>
        <h1 className="login-nico-title">Iniciar sesión</h1>
        <div className="login-nico-form-group">
          <label className="login-nico-form-label" htmlFor="email">Email</label>
          <input className="login-nico-form-input" id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div className="login-nico-form-group">
          <label className="login-nico-form-label" htmlFor="contraseña">Contraseña</label>
          <input className="login-nico-form-input" id="contraseña" type="password" value={contraseña} onChange={(event) => setContraseña(event.target.value)} />
        </div>
        <button className="login-nico-button" type="submit">Iniciar sesión</button>
        {error && <p className="login-nico-error-message">{error}</p>}
      </form>
    </div>
  );
}
