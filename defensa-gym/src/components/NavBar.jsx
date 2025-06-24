import { useState } from "react";
import { Link } from "react-router-dom";
import { CONTACTUS, HOME, LOGIN, REGISTER } from "../routers/routes";
import logo from '../assets/gymlogo.png';
import { FaUserPlus, FaUserCheck, FaAlignJustify, FaComments, FaHome } from "react-icons/fa";

const links = [
  { id: 1, to: HOME, text: 'Inicio', icon: <FaHome className="text-3xl ml-2" /> },
  { id: 2, to: CONTACTUS, text: 'Contactanos', icon: <FaComments className="text-3xl ml-2" /> },
  { id: 3, to: REGISTER, text: 'Registrarse', icon: <FaUserPlus className="text-3xl ml-2" /> },
  { id: 4, to: LOGIN, text: 'Iniciar Sesion', icon: <FaUserCheck className="text-3xl ml-2" /> },
];

export const NavBar = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);

  return (
    <nav className="flex justify-around items-center border-4 border-red-950/50 bg-red-900/50 fixed left-0 top-0 w-full p-4 shadow-lg shadow-red-700">
      <Link to={HOME}>
        <img src={logo} alt="logo de gym" className="rounded-full shadow-red-700 shadow-lg size-28 border-2 border-red-700 hover:opacity-70"/>
      </Link>
      <button className="md:hidden border-2 border-red-700 bg-red-500 hover:bg-red-700 font-bold text-red-200 shadow-lg shadow-red-700 py-2 px-4 rounded" onClick={() => setMostrarMenu(!mostrarMenu)}>
        <FaAlignJustify/>
      </button>
      <ul className={`md:flex md:flex-row md:relative md:top-0 md:right-0 bg-red-500 rounded-b-lg shadow-md shadow-red-700 text-red-200 font-bold ${mostrarMenu ? 'flex-col top-36 -right-1 absolute' : 'hidden'}`}>
        {links.map(link => (
          <li key={link.id} className="flex items-center justify-between border-2 border-red-700 h-10 p-4 md:py-0 hover:bg-red-700">
            <Link to={link.to} onClick={() => setMostrarMenu(false)} className="flex justify-between w-full items-center">
              <span className="flex-1 text-center">{link.text}</span>
              {link.icon}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};