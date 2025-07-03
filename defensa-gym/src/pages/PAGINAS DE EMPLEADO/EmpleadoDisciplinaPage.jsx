import { Footer } from "../../components/HEADER Y FOOTER/Footer"
import { Header } from "../../components/HEADER Y FOOTER/Header"
import { Disciplina } from "../../components/MAIN/Disciplina";

export const EmpleadoDisciplinaPage = () => {

  const rol = 'empleado';

  return (
    <div >
      <Header rol={rol} />
      <main >
        <Disciplina/>
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