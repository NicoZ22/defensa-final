import { ADMIN, BUZON, CALENDARIO_E, CALENDARIO_S, CONTACT, DISCIPLINA, EMPLEADO, HOME, LOGIN, PERFIL, REGISTER, SOCIO } from "../../routes/path";
import { Link } from 'react-router-dom';
import { FaHome, FaComments, FaUserPlus, FaUserCheck, FaAlignJustify, FaEnvelope, FaCog, FaSignInAlt, FaCalendarAlt, FaRunning, FaUserCircle } from 'react-icons/fa';
import { useEffect, useState } from "react";
import logo from '../../assets/LOGOS/gymlogo.png';
import '../../styles/HEADER Y FOOTER/header.css'

export const Header = ({rol}) => {

  const [links, setLinks] = useState([]);
  const [linklogo, setLinklogo] = useState(null);
  const [mostrarMenu, setMostrarMenu] = useState(false);

  useEffect(() => {
    if (rol === 'admin') {
      setLinks([
        { id: 1, to: ADMIN, text: 'Admin', icon: <FaCog className="me-2" /> },
        { id: 2, to: BUZON, text: 'Buzon', icon: <FaEnvelope className="me-2" /> },
        { id: 3, to: HOME, text: 'Cerrar Sesion', icon: <FaSignInAlt className="me-2" /> },
      ]);
      setLinklogo(ADMIN);
    } else if (rol === 'empleado') {
      setLinks([
        { id: 1, to: `${EMPLEADO}/${localStorage.getItem('usuarioId')}`, text: 'Mis clases', icon: <FaCalendarAlt className="me-2" /> },
        { id: 2, to: `${EMPLEADO}/${localStorage.getItem('usuarioId')}/${localStorage.getItem('rol')}${DISCIPLINA}`, text: 'Disciplinas', icon: <FaRunning className="me-2" /> },
        { id: 3, to: CALENDARIO_E, text: 'Calendario', icon: <FaUserCheck className="me-2" /> },
        { id: 4, to: `${EMPLEADO}/${localStorage.getItem('usuarioId')}${CONTACT}`, text: 'Contactanos', icon: <FaComments className="me-2" /> },
        { id: 5, to: `${EMPLEADO}/${localStorage.getItem('usuarioId')}${PERFIL}`, text: 'Mi Perfil', icon: <FaUserCircle className="me-2" /> },
        { id: 6, to: HOME, text: 'Cerrar Sesion', icon: <FaSignInAlt className="me-2" /> },
      ]);
      setLinklogo(EMPLEADO);
    } else if (rol === 'socio') {
      setLinks([
        { id: 1, to: `${SOCIO}/${localStorage.getItem('usuarioId')}`, text: 'Mis clases', icon: <FaCalendarAlt className="me-2" /> },
        { id: 2, to: `${SOCIO}/${localStorage.getItem('usuarioId')}/${localStorage.getItem('rol')}${DISCIPLINA}`, text: 'Disciplinas', icon: <FaRunning className="me-2" /> },
        { id: 3, to: CALENDARIO_S, text: 'Calendario', icon: <FaUserCheck className="me-2" /> },
        { id: 4, to: `${SOCIO}/${localStorage.getItem('usuarioId')}${CONTACT}`, text: 'Contactanos', icon: <FaComments className="me-2" /> },
        { id: 5, to: `${SOCIO}/${localStorage.getItem('usuarioId')}${PERFIL}`, text: 'Mi Perfil', icon: <FaUserCircle className="me-2" /> },
        { id: 6, to: HOME, text: 'Cerrar Sesion', icon: <FaSignInAlt className="me-2" /> },
      ]);
      setLinklogo(SOCIO);
    } else {
      setLinks([
        { id: 1, to: HOME, text: 'Inicio', icon: <FaHome className="me-2" /> },
        { id: 2, to: CONTACT, text: 'Contactanos', icon: <FaComments className="me-2" /> },
        { id: 3, to: REGISTER, text: 'Registrarse', icon: <FaUserPlus className="me-2" /> },
        { id: 4, to: LOGIN, text: 'Iniciar Sesion', icon: <FaUserCheck className="me-2" /> },
      ]);
      setLinklogo(HOME);
      localStorage.setItem('rol', 'anonimo')
    }
  }, [rol]);

  return (
    <header className="header-nico">
      <nav>
        <div className="container">
          <Link to={linklogo} className="logo">
            <img src={logo} alt="logo de gym" />
            <span>RED</span>
          </Link>
          <button className="menu-toggle" onClick={() => setMostrarMenu(!mostrarMenu)}>
            <FaAlignJustify />
          </button>
          <ul className={`nav-links ${mostrarMenu ? 'show' : ''}`}>
            {links.map(link => (
              <li key={link.id}>
                <Link to={link.to} className="nav-link" onClick={() => setMostrarMenu(false)}>
                  {link.text} {link.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}