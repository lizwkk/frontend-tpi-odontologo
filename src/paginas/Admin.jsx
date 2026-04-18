import { useState, useEffect } from "react";
import axios from "axios";
import AgregarAdmin from "./paneladmin/AgregarAdmin.jsx";
import UsuariosAdmin from "./paneladmin/UsuariosAdmin.jsx";
import TurnosAdmin from "./paneladmin/TurnosAdmin.jsx"; 

export default function Admin({ onLogout }) {
  const [usuarios, setUsuarios] = useState([]);
  const [turnos, setTurnos] = useState([]); 
  
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  const obtenerUsuarios = async () => {
    try {
      const resp = await axios.get("http://localhost:3000/api/usuarios", {
        headers: { Authorization: token }
      });
      if (resp.data && resp.data.usuarios) {
        setUsuarios(resp.data.usuarios);
      } else {
        setUsuarios(resp.data);
      }
    } catch (error) {
      console.error("Error al obtener usuarios", error);
    }
  };

  const obtenerTurnos = async () => {
    try {
      const resp = await axios.get("http://localhost:3000/api/turnos/admin", {
        headers: { Authorization: token }
      });
      if (resp.data && resp.data.turnos) {
        setTurnos(resp.data.turnos);
      } else {
        setTurnos(resp.data);
      }
    } catch (error) {
      console.error("Error al obtener turnos", error);
    }
  };

  useEffect(() => {
    if (rol === "admin") {
      obtenerUsuarios();
      obtenerTurnos();
    }
  }, [rol]);

  if (rol !== "admin") {
    return (
      <div className="shell">
        <h2 style={{color: 'red', textAlign: 'center', marginTop: '50px'}}>
          Acceso Denegado: No tenés permisos de administrador.
        </h2>
      </div>
    );
  }

  return (
    <div className="shell">
      <div className="shell-top">
        <h2 className="shell-title">Panel de Administración</h2>
        <button className="logout-button" onClick={onLogout}>Cerrar Sesión</button>
      </div>

      <div className="admin-grid" style={{ display: 'grid', gap: '20px' }}>
        <AgregarAdmin onActualizar={obtenerUsuarios} token={token} />
        <UsuariosAdmin usuarios={usuarios} onActualizar={obtenerUsuarios} token={token} />
        <TurnosAdmin turnos={turnos} onActualizar={obtenerTurnos} token={token} />
      </div>
    </div>
  );
}