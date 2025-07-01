import React, { useState, useEffect } from "react";
import "../../styles/MAIN/editperfil.css";

export const EditPerfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [foto, setFoto] = useState(null);
  const [storageKey, setStorageKey] = useState(null);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    const fuentes = ["empleadoData", "socioData", "adminData"];
    for (let key of fuentes) {
      const data = localStorage.getItem(key);
      if (data) {
        const parsed = JSON.parse(data);
        setUsuario(parsed);
        setFoto(parsed.foto || null);
        setStorageKey(key);
        setForm(parsed);
        break;
      }
    }
  }, []);

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

  const eliminarFoto = () => {
    setFoto(null);
    setForm((prev) => ({ ...prev, foto: "" }));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardarCambios = () => {
    if (!form.nombre || !form.apellido || !form.email) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      alert("El email no es válido.");
      return;
    }

    setUsuario(form);
    setEditando(false);
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(form));
    }
  };

  const cancelarEdicion = () => {
    setForm(usuario);
    setFoto(usuario.foto || null);
    setEditando(false);
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
      <h1>MI PERFIL</h1>
      <div className="perfil-card">
        {foto ? (
          <>
            <img src={foto} alt="Foto de perfil" className="perfil-foto" />
            {editando && (
              <button onClick={eliminarFoto} className="btn-eliminar">
                Eliminar foto
              </button>
            )}
          </>
        ) : (
          <p>No hay foto de perfil</p>
        )}

        {editando && (
          <input type="file" accept="image/*" onChange={handleImagen} />
        )}

        {editando ? (
          <>
            <input
              type="text"
              name="nombre"
              value={form.nombre || ""}
              onChange={handleChange}
              placeholder="Nombre"
            />
            <input
              type="text"
              name="apellido"
              value={form.apellido || ""}
              onChange={handleChange}
              placeholder="Apellido"
            />
            <input
              type="email"
              name="email"
              value={form.email || ""}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="tel"
              value={form.tel || ""}
              onChange={handleChange}
              placeholder="Teléfono"
            />
            <input
              type="text"
              name="dni"
              value={form.dni || ""}
              onChange={handleChange}
              placeholder="DNI"
            />
            <input
              type="number"
              name="edad"
              value={form.edad || ""}
              onChange={handleChange}
              placeholder="Edad"
            />
            <input
              type="text"
              name="descripción"
              value={form.descripción || ""}
              onChange={handleChange}
              placeholder="Descripción"
            />

            <div className="perfil-actions">
              <button onClick={guardarCambios}>Guardar cambios</button>
              <button onClick={cancelarEdicion}>Cancelar</button>
            </div>
          </>
        ) : (
          <>
            <div className="perfil-info">
              <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}</p>
              <p><strong>Email:</strong> {usuario.email}</p>
              <p><strong>Teléfono:</strong> {usuario.tel}</p>
              <p><strong>DNI:</strong> {usuario.dni}</p>
              <p><strong>Edad:</strong> {usuario.edad}</p>
              <p><strong>Rol:</strong> {usuario.rol}</p>
              <p><strong>Descripción:</strong> {usuario.descripción || "Sin descripción"}</p>
            </div>
            <div className="perfil-actions">
              <button onClick={() => setEditando(true)}>Editar perfil</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
