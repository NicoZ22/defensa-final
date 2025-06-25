import React, { useEffect, useState } from 'react';
import '../css/perfil.css';

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    const datosGuardados = JSON.parse(localStorage.getItem("usuarioData"));
    const fotoGuardada = localStorage.getItem("usuarioFoto");
    setUsuario(datosGuardados);
    if (fotoGuardada) {
      setFoto(fotoGuardada);
    }
  }, []);

  const handleImagen = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result);
        localStorage.setItem("usuarioFoto", reader.result);
      };
      reader.readAsDataURL(archivo);
    }
  };

  if (!usuario) {
    return (
      <div className="perfil-container">
        <p>No hay usuario logueado.</p>
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <h1>Mi Perfil</h1>
      <div className="perfil-card">
        {foto ? (
          <img src={foto} alt="Foto de perfil" className="perfil-foto" />
        ) : (
          <p>No hay foto de perfil</p>
        )}

        <input type="file" accept="image/*" onChange={handleImagen} />

        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Usuario:</strong> {usuario.usuario}</p>
      </div>
    </div>
  );
};

export default Perfil;
