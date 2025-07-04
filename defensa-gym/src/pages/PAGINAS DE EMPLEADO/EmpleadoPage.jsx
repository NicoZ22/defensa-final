import { Footer } from "../../components/HEADER Y FOOTER/Footer";
import { Header } from "../../components/HEADER Y FOOTER/Header";
import { Empleado } from "../../components/MAIN/Empleado";

export const EmpleadoPage = () => {
  const rol = 'empleado';

  return (
    <div>
      <Header rol={rol} />
      <main>
        <Empleado/>
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