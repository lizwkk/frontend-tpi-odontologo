import { useState, useEffect } from "react";
import axios from "axios";
import AgregarAdmin from "./paneladmin/AgregarAdmin.jsx";
import UsuariosAdmin from "./paneladmin/UsuariosAdmin.jsx";

export default function Admin({ onLogout }) {
  const [usuarios, setUsuarios] = useState([]);
  const token = localStorage.getItem("token");

  const obtenerUsuarios = async () => {
    try {
      const resp = await axios.get("http://localhost:3000/api/usuarios", {
        headers: { Authorization: token }
      });
      setUsuarios(resp.data);
    } catch (error) {
      console.error("Error al obtener usuarios", error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return (
    <div className="shell">
      <div className="shell-top">
        <h2 className="shell-title">Panel de Administración</h2>
        <button className="logout-button" onClick={onLogout}>Cerrar Sesión</button>
      </div>

      <div className="admin-grid">
        {/* Llamamos a los componentes y les pasamos lo que necesitan */}
        <AgregarAdmin onActualizar={obtenerUsuarios} token={token} />
        
        <UsuariosAdmin usuarios={usuarios} onActualizar={obtenerUsuarios} token={token} />
      </div>
    </div>
  );
}