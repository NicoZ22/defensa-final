import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Register } from '../components/MAINS/Register'

export const RegisterPage = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <Header/>
      <main className="flex-grow pt-32">
        <Register/>
      </main>
      <Footer/>
    </div>
  )
}