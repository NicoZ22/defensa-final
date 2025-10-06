import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL_EMPLEADOS, URL_SOCIOS, URL_ADMINS } from "../../utils/endpoints";
import "../../styles/MAIN/perfil.css";

export const Perfil = () => {
  const [usuario, setUsuario] = useState({});
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({});
  const [userId, setUserId] = useState(localStorage.getItem("usuarioId"));
  const [rol, setRol] = useState(localStorage.getItem("rol"));
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        let endpoint;
        if (rol === "empleado") {
          endpoint = URL_EMPLEADOS;
        } else if (rol === "socio") {
          endpoint = URL_SOCIOS;
        } else if (rol === "admin") {
          endpoint = URL_ADMINS;
        }

        const response = await axios.get(`${endpoint}/${userId}`);
        setUsuario(response.data);
        setForm(response.data);
        setFoto(response.data.foto || null);
      } catch (error) {
        console.error("Error al cargar usuario:", error);
      }
    };

    obtenerUsuario();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImagen = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;
    if (!archivo.type.startsWith("image/")) {
      alert("Por favor selecciona un archivo de imagen válido.");
      return;
    }
    if (archivo.size > 2 * 1024 * 1024) {
      alert("La imagen es demasiado grande. Máximo 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const nuevaFoto = reader.result;
      setFoto(nuevaFoto);
      setForm((prev) => ({ ...prev, foto: nuevaFoto }));
    };
    reader.readAsDataURL(archivo);
  };

  const guardarCambios = async () => {
    try {
      let endpoint;
      if (rol === "empleado") {
        endpoint = URL_EMPLEADOS;
      } else if (rol === "socio") {
        endpoint = URL_SOCIOS;
      } else if (rol === "admin") {
        endpoint = URL_ADMINS;
      }

      await axios.put(`${endpoint}/${userId}`, form);
      setUsuario(form);
      setEditando(false);
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };

  return (
    <div className="perfil-ricardo-container">
      <h1 className="perfil-ricardo-titulo">Mi Perfil</h1>
      {editando ? (
        <form className="perfil-ricardo-formulario" onSubmit={(e) => {
            e.preventDefault();
            guardarCambios();
          }}
        >
          {foto && <img src={foto} alt="Foto de perfil" className="perfil-ricardo-foto" />}
          <input type="file" accept="image/*" onChange={handleImagen} />
          <label>Nombre:</label>
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} />
          <br />
          <label>Apellido:</label>
          <input type="text" name="apellido" value={form.apellido} onChange={handleChange} />
          <br />
          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />
          <br />
          <label>Teléfono:</label>
          <input type="text" name="tel" value={form.tel} onChange={handleChange} />
          <br />
          <label>DNI:</label>
          <input type="text" name="dni" value={form.dni} onChange={handleChange} />
          <br />
          <label>Edad:</label>
          <input type="number" name="edad" value={form.edad} onChange={handleChange} />
          <br />
          <label>Descripción:</label>
          <textarea name="descripción" value={form.descripción} onChange={handleChange} />
          <br />
          <div className="perfil-ricardo-botones">
            <button type="submit">Guardar cambios</button>
            <button type="button" onClick={() => setEditando(false)}>Cancelar</button>
          </div>
        </form>
      ) : (
        <div className="perfil-ricardo-informacion">
          <div className="container-perfil-ricardo-foto">
            {usuario.foto && <img src={usuario.foto} alt="Foto de perfil" className="perfil-ricardo-foto" />}
          </div>
          <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
          <p><strong>Teléfono:</strong> {usuario.tel}</p>
          <p><strong>DNI:</strong> {usuario.dni}</p>
          <p><strong>Edad:</strong> {usuario.edad}</p>
          <p><strong>Descripción:</strong> {usuario.descripción}</p>
          <div className="perfil-ricardo-botones">
            <button onClick={() => setEditando(true)}>Editar perfil</button>
          </div>
        </div>
      )}
    </div>
  );
};
