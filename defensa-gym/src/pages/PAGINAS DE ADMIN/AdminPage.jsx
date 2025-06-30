import { useNavigate } from "react-router-dom"
import { BuzonPage } from "./BuzonPage"

export const AdminPage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/buzon"); // Asegúrate que esta ruta esté definida en tu router
  };

  return (
    <div>
      <h2>AdminPage</h2>
      <button onClick={handleRedirect}>Ir a Buzón</button>
    </div>
  )
}