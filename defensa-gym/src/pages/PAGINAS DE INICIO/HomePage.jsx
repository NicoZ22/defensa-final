import { Footer } from "../../components/HEADER Y FOOTER/Footer"
import { Header } from "../../components/HEADER Y FOOTER/Header"
import { Home } from "../../components/MAIN/Home"

export const HomePage = () => {
  return (
    <div>
      <Header/>
      <main>
        <Home/>
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
