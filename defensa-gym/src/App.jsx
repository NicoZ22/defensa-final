import './App.css'
import Contactos from './page/Contactos'
import Perfil from './page/Perfil'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Admin from './page/BuzonMensaje';

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/buzon" element={<Admin />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
