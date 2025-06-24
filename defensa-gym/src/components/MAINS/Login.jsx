import { useState } from 'react';
import { apiService } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { DUEÑO, EMPLEADO, SOCIO } from '../../routers/routes';
import logo from '../../assets/gym1.jpeg';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const [dueños, socios, empleados] = await Promise.all([
        apiService.dueños.getAll(),
        apiService.socios.getAll(),
        apiService.empleados.getAll(),
      ]);

      const usuarios = [...dueños, ...socios, ...empleados];
      const usuario = usuarios.find((u) => u.email === email && u.password === password);

      if (usuario) {
        switch (usuario.rol) {
          case 'dueño':
            navigate(DUEÑO);
            break;
          case 'socio':
            navigate(SOCIO);
            break;
          case 'empleado':
            navigate(EMPLEADO);
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
    <div className="container mx-auto p-4 mt-4 w-dvw h-dvh flex flex-col justify-center items-center" style={{
          background: `url(${logo}) no-repeat center center / cover`,
          width: '100dvw',
          marginTop: '4em',
        }}>
      <h1 className="text-3xl text-gray-50/80 font-bold mb-4 text-center">Iniciar sesión</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50/80 rounded-lg px-8 pt-6 pb-8 mb-4 max-w-md mx-auto"
        style={{ boxShadow: '0 0 10px 5px white' }}
      >
        <div className="flex flex-col mb-4">
          <label className="block text-gray-700/80 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 w-full md:w-sm bg-blue-100/80  text-black leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="block text-gray-700/80 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 w-full md:w-sm bg-blue-100/80  text-black leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button
          className="bg-red-500/80 hover:bg-red-700/80 text-red-200/80 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto block"
          type="submit"
        >
          Iniciar sesión
        </button>
        {error && <p className="text-red-500/80 text-center mt-2 font-bold">{error}</p>}
      </form>
    </div>
  )
};