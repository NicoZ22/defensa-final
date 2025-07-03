import { Footer } from "../../components/HEADER Y FOOTER/Footer"
import { Header } from "../../components/HEADER Y FOOTER/Header"
import { Buzon } from "../../components/MAIN/Buzon"

export const BuzonPage = () => {

   const rol = 'admin';

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header rol={rol} />
      <main className="flex-grow-1 overflow-auto">
        <Buzon/>
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
