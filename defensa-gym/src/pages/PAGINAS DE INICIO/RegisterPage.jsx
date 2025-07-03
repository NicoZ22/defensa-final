import { Footer } from "../../components/HEADER Y FOOTER/Footer"
import { Header } from "../../components/HEADER Y FOOTER/Header"
import { Register } from "../../components/MAIN/Register"

export const RegisterPage = () => {
  return (
    <div>
      <Header/>
      <main>
        <Register/>
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
