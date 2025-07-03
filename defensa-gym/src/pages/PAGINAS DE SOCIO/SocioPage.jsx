import { Footer } from "../../components/HEADER Y FOOTER/Footer"
import { Header } from "../../components/HEADER Y FOOTER/Header"
import { Socio } from "../../components/MAIN/Socio"

export const SocioPage = () => {

  const rol = 'socio';

  return (
    <div >
      <Header rol={rol} />
      <main >
        <Socio/>
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
