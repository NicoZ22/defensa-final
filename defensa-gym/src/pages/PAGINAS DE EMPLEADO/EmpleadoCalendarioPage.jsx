import { Footer } from "../../components/HEADER Y FOOTER/Footer"
import { Header } from "../../components/HEADER Y FOOTER/Header"
import { Calendario } from "../../components/MAIN/Calendario"

export const EmpleadoCalendarioPage = () => {

  const rol = 'empleado'

  return (
    <div>
      <Header rol={rol} />
      <main>
        <Calendario/>
      </main>
      <div style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
      }}>
        <Footer/>

      </div>
    </div>
  )
}
