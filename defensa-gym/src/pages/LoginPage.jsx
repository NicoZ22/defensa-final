import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Login } from '../components/MAINS/Login'

export const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <Header/>
      <main>
        <Login/>
      </main>
      <Footer/>
    </div>
  )
}
