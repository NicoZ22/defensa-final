import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CONTACTUS, DUEÑO, EMPLEADO, HOME, LOGIN, REGISTER, SOCIO } from "./routers/routes"
import { HomePage } from "./pages/HomePage"
import { ContactUsPage } from "./pages/ContactUsPage"
import { RegisterPage } from "./pages/RegisterPage"
import { LoginPage } from "./pages/LoginPage"
import { DueñoPage } from "./pages/DueñoPage"
import { DisciplinasPage } from "./pages/DisciplinasPage"

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME} element={<HomePage/> } />
        <Route path={CONTACTUS} element={<ContactUsPage/> } />
        <Route path={REGISTER} element={<RegisterPage/> } />
        <Route path={LOGIN} element={<LoginPage/> } />
        <Route path={DUEÑO} element={<DueñoPage/> } />
        <Route path={EMPLEADO} element={<LoginPage/> } />
        <Route path={SOCIO} element={<DisciplinasPage/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
