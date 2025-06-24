import { Dueño } from '../components/MAINS/Dueño'
import { Footer } from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { HOME } from '../routers/routes';

export const DueñoPage = () => {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(HOME);
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <header className='bg-red-900/50 p-8 text-white font-bold text-center w-full flex justify-between items-center'>
        ADMIN
        <button onClick={handleClick} className='border-2 border-white p-4 hover:bg-red-900 hover:border-red-500 hover:text-red-200'>Salir</button>
      </header>
      <main className="flex-grow py-40">
        <Dueño/>
      </main>
      <Footer/>
    </div>
  )
}
