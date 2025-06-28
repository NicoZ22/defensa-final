import { AdminPage } from "../pages/PAGINAS DE ADMIN/AdminPage"
import { DisciplinaPage } from "../pages/PAGINAS DE DISCIPLINA/DisciplinaPage"
import { EmpleadoPage } from "../pages/PAGINAS DE EMPLEADO/EmpleadoPage"
import { ContactPage } from "../pages/PAGINAS DE INICIO/ContactPage"
import { HomePage } from "../pages/PAGINAS DE INICIO/HomePage"
import { LoginPage } from "../pages/PAGINAS DE INICIO/LoginPage"
import { RegisterPage } from "../pages/PAGINAS DE INICIO/RegisterPage"
import { SocioPage } from "../pages/PAGINAS DE SOCIO/SocioPage"
import { ADMIN, CONTACT, DISCIPLINA, EMPLEADO, HOME, LOGIN, REGISTER, SOCIO } from "./path"

export const Rutas = () => {
  
  const rutas = [
    { path: HOME, element: <HomePage/> },
    { path: REGISTER, element: <RegisterPage/> },
    { path: LOGIN, element: <LoginPage/> },
    { path: CONTACT, element: <ContactPage/> },
    { path: ADMIN, element: <AdminPage/> },
    { path: EMPLEADO, element: <EmpleadoPage/> },
    { path: SOCIO, element: <SocioPage/> },
    { path: DISCIPLINA, element: <DisciplinaPage/> }
  ]
  
  return (
    <Routes>
      {rutas.map((ruta) => (
        <Route key={ruta.path} path={ruta.path} element={ruta.element} />
      ))}
    </Routes>
  );
};