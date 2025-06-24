import { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { generarId } from '../../utils/generarID';
import logo from '../../assets/gym1.jpeg'

export const Register = () => {
  const [socios, setSocios] = useState([]);
  const [socio, setSocio] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    email: '',
    tel: '',
    dni: '',
    password: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerSocios = async () => {
      try {
        const data = await apiService.socios.getAll();
        setSocios(data);
      } catch (error) {
        setError(error.message);
      }
    };
    obtenerSocios();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if ( !socio.nombre || !socio.apellido || !socio.edad || !socio.email || !socio.tel || !socio.dni || !socio.password) {
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
      const nuevoSocio = { id: generarId(socios), rol: 'socio', ...socio };
      const crearSocio = await apiService.socios.create(nuevoSocio);
      setSocios([...socios, crearSocio]);
      setError(null);
      setSocio({
        nombre: '',
        apellido: '',
        edad: '',
        email: '',
        tel: '',
        dni: '',
        password: '',
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-4 flex flex-col justify-center items-center"
    style={{
      background: `url(${logo}) no-repeat center center / cover`,
      width: '100dvw',
      marginTop: '4em',
    }}>

      <h1 className="text-3xl text-gray-50/80 font-bold mb-4 text-center">Registrar Socio</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50/80 rounded-lg px-8 pt-6 pb-8 mb-4 max-w-md mx-auto"
        style={{ boxShadow: '0 0 10px 5px white' }}
      >
        <div className="flex flex-col mb-4">
          <label className="block text-gray-700/80 text-sm font-bold mb-2" htmlFor="nombre">
            Nombre
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 w-full md:w-sm bg-blue-100/80  text-black leading-tight focus:outline-none focus:shadow-outline"
            id="nombre"
            type="text"
            value={socio.nombre}
            onChange={(event) => setSocio({ ...socio, nombre: event.target.value })}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="block text-gray-700/80 text-sm font-bold mb-2" htmlFor="apellido">
            Apellido
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 w-full md:w-sm bg-blue-100/80  text-black leading-tight focus:outline-none focus:shadow-outline"
            id="apellido"
            type="text"
            value={socio.apellido}
            onChange={(event) => setSocio({ ...socio, apellido: event.target.value })}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="block text-gray-700/80 text-sm font-bold mb-2" htmlFor="edad">
            Edad
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 w-full md:w-sm bg-blue-100/80  text-black leading-tight focus:outline-none focus:shadow-outline"
            id="edad"
            type="number"
            value={socio.edad}
            onChange={(event) => setSocio({ ...socio, edad: event.target.value })}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="block text-gray-700/80 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 w-full md:w-sm bg-blue-100/80  text-black leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={socio.email}
            onChange={(event) => setSocio({ ...socio, email: event.target.value })}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="block text-gray-700/80 text-sm font-bold mb-2" htmlFor="tel">
            Teléfono
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 w-full md:w-sm bg-blue-100/80  text-black leading-tight focus:outline-none focus:shadow-outline"
            id="tel"
            type="text"
            value={socio.tel}
            onChange={(event) => setSocio({ ...socio, tel: event.target.value })}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="block text-gray-700/80 text-sm font-bold mb-2" htmlFor="dni">
            DNI
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 w-full md:w-sm bg-blue-100/80  text-black leading-tight focus:outline-none focus:shadow-outline"
            id="dni"
            type="text"
            value={socio.dni}
            onChange={(event) => setSocio({ ...socio, dni: event.target.value })}
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
            value={socio.password}
            onChange={(event) => setSocio({ ...socio, password: event.target.value })}
          />
        </div>
        <button
          className="bg-red-500/80 hover:bg-red-700/80 text-red-200/80 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto block"
          type="submit"
        >
          Registrar
        </button>
        {error && <p className="text-red-500/80 text-center mt-2 font-bold">{error}</p>}
      </form>
    </div>
  );
};