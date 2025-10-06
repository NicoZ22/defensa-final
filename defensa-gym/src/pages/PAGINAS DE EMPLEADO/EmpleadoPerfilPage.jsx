import { Footer } from "../../components/HEADER Y FOOTER/Footer"
import { Header } from "../../components/HEADER Y FOOTER/Header"
import { Perfil } from "../../components/MAIN/Perfil";

export const EmpleadoPerfilPage = () => {

  const rol = 'empleado';

  return (
    <div >
      <Header rol={rol} />
      <main >
        <Perfil/>
      </main>
      <div style={{
        position: 'absolute',
        bottom: 0,
        width: '100%'
      }}>
        <Footer/>

      </div>
    </div>
  )
}
