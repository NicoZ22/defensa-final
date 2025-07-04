import { Footer } from "../../components/HEADER Y FOOTER/Footer"
import { Header } from "../../components/HEADER Y FOOTER/Header"
import { Contact } from "../../components/MAIN/Contact"

export const SocioContactPage = () => {

  const rol = 'socio';

  return (
    <div >
      <Header rol={rol} />
      <main >
        <Contact/>
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