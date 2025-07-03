
// export const HomePage = () => {
//   return (
//     <div>HomePage</div>
//   )
// }



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const manejarLogin = async () => {
    const roles = ["admins", "empleados", "socios"];

    for (const rol of roles) {
      try {
        const res = await fetch(`http://localhost:3000/${rol}?email=${email}`);
        const data = await res.json();

        if (data.length > 0 && data[0].contraseña === contraseña) {
          sessionStorage.setItem("userEmail", data[0].email);
          sessionStorage.setItem("userRol", data[0].rol);
          navigate("/editperfil"); // Asegúrate de tener esta ruta
          return;
        }
      } catch (err) {
        console.error("Error de conexión:", err);
        setError("Error al conectar con el servidor.");
        return;
      }
    }

    setError("Correo o contraseña incorrectos.");
  };

  return (
    <div style={estilos.contenedor}>
      <h2>Iniciar sesión</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={estilos.input}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        style={estilos.input}
      />
      <button onClick={manejarLogin} style={estilos.boton}>Entrar</button>
      {error && <p style={estilos.error}>{error}</p>}
    </div>
  );
};

const estilos = {
  contenedor: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "300px",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f0f0f0",
  },
  input: {
    marginBottom: "10px",
    padding: "8px",
    fontSize: "16px"
  },
  boton: {
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer"
  },
  error: {
    color: "red",
    marginTop: "10px"
  }
};
