import { Header } from '../components/Header'
import { Disciplinas } from '../components/MAINS/Disciplinas'
import { Footer } from '../components/Footer'

export const DisciplinasPage = () => {
  return (
    <div>
      <Header/>
      <main className='mt-32'>
        <Disciplinas/>
      </main>
      <Footer/>
    </div>
  )
}
