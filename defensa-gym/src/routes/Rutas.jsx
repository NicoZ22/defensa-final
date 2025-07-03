import { Route, Routes } from "react-router-dom"
import { ADMIN, BUZON, CALENDARIO_E, CALENDARIO_S, CONTACT, DISCIPLINA, EMPLEADO, HOME, LOGIN, PERFIL, REGISTER, SOCIO } from "./path"
import { AdminPage } from "../pages/PAGINAS DE ADMIN/AdminPage"
import { EmpleadoPage } from "../pages/PAGINAS DE EMPLEADO/EmpleadoPage"
import { ContactPage } from "../pages/PAGINAS DE INICIO/ContactPage"
import { HomePage } from "../pages/PAGINAS DE INICIO/HomePage"
import { LoginPage } from "../pages/PAGINAS DE INICIO/LoginPage"
import { RegisterPage } from "../pages/PAGINAS DE INICIO/RegisterPage"
import { SocioPage } from "../pages/PAGINAS DE SOCIO/SocioPage"
import { BuzonPage } from "../pages/PAGINAS DE ADMIN/BuzonPage"
import { SocioContactPage } from "../pages/PAGINAS DE SOCIO/SocioContactPage"
import { EmpleadoContactPage } from "../pages/PAGINAS DE EMPLEADO/EmpleadoContactPage"
import { SocioDisciplinaPage } from "../pages/PAGINAS DE SOCIO/SocioDisciplinaPage"
import { EmpleadoDisciplinaPage } from "../pages/PAGINAS DE EMPLEADO/EmpleadoDisciplinaPage"
import { SocioPerfilPage } from "../pages/PAGINAS DE SOCIO/SocioPerfilPage"
import { EmpleadoPerfilPage } from "../pages/PAGINAS DE EMPLEADO/EmpleadoPerfilPage"
import { SocioCalendarioPage } from "../pages/PAGINAS DE SOCIO/SocioCalendarioPage"
import { EmpleadoCalendarioPage } from "../pages/PAGINAS DE EMPLEADO/EmpleadoCalendarioPage"

export const Rutas = () => {
  
  const rutas = [
    { path: HOME, element: <HomePage/> },
    { path: REGISTER, element: <RegisterPage/> },
    { path: LOGIN, element: <LoginPage/> },
    { path: CONTACT, element: <ContactPage/> },
    { path: ADMIN, element: <AdminPage/> },
    { path: EMPLEADO, element: <EmpleadoPage/> },
    { path: SOCIO, element: <SocioPage/> },
    { path: BUZON, element: <BuzonPage/> },
    { path: CALENDARIO_S, element: <SocioCalendarioPage/> },
    { path: CALENDARIO_E, element: <EmpleadoCalendarioPage/> }

  ]
  
  return (
    <Routes>
      {rutas.map((ruta) => (
        <Route key={ruta.path} path={ruta.path} element={ruta.element} />
      ))}
      <Route path={`${SOCIO}/:id`} element={<SocioPage/>} />
      <Route path={`${ADMIN}/:id`} element={<AdminPage/>} />
      <Route path={`${EMPLEADO}/:id`} element={<EmpleadoPage/>} />
      <Route path={`${SOCIO}/:id/:rol${DISCIPLINA}`} element={<SocioDisciplinaPage/>} />
      <Route path={`${EMPLEADO}/:id/:rol${DISCIPLINA}`} element={<EmpleadoDisciplinaPage/>} />
      <Route path={`${SOCIO}/:id${CONTACT}`} element={<SocioContactPage />} />
      <Route path={`${EMPLEADO}/:id${CONTACT}`} element={<EmpleadoContactPage />} />
      <Route path={`${SOCIO}/:id${PERFIL}`} element={<SocioPerfilPage />} />
      <Route path={`${EMPLEADO}/:id${PERFIL}`} element={<EmpleadoPerfilPage />} />
    </Routes>
  );
};