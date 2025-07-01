import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

export const AdminPage = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Intenta obtener los datos del admin desde localStorage
    const adminData = localStorage.getItem("admin");
    if (adminData) {
      setUsuario(JSON.parse(adminData));
    }
  }, []);

  const handleRedirect1 = () => {
    navigate("/editperfil");
  };
  const handleRedirect = () => {
    navigate("/buzon"); 
  };

  return (
    <div>
      <h2>AdminPage</h2>
      <button onClick={handleRedirect}>Ir a Buzón</button>
     <div>
  <button onClick={handleRedirect1} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    {usuario && usuario.foto && (
      <img
        src={usuario.foto}
        alt="Perfil"
        style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }}
      />
    )}
    {usuario ? usuario.nombre : "Perfil"}
  </button>
</div>
    </div>
  )
}