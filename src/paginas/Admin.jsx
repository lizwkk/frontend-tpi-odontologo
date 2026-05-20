import { useState, useEffect } from "react";
import axios from "axios";
import AgregarAdmin from "./paneladmin/AgregarAdmin.jsx";
import UsuariosAdmin from "./paneladmin/UsuariosAdmin.jsx";
import TurnosAdmin from "./paneladmin/TurnosAdmin.jsx"; 
import ProfesionalesAdmin from "./paneladmin/ProfesionalesAdmin.jsx";

export default function Admin({ onLogout }) {
  const [usuarios, setUsuarios] = useState([]);
  const [turnos, setTurnos] = useState([]); 
  const [profesionales, setProfesionales] = useState([]);
  
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  const obtenerUsuarios = async () => {
    try {
      const resp = await axios.get("http://localhost:3000/api/usuarios", {
        headers: { Authorization: token }
      });
      setUsuarios(resp.data.usuarios || resp.data);
    } catch (error) {
      console.error("Error al obtener usuarios", error);
    }
  };

  const obtenerTurnos = async () => {
    try {
      const resp = await axios.get("http://localhost:3000/api/turnos/admin", {
        headers: { Authorization: token }
      });
      setTurnos(resp.data.turnos || resp.data);
    } catch (error) {
      console.error("Error al obtener turnos", error);
    }
  };

  const obtenerProfesionales = async () => {
    try {
      const resp = await axios.get("http://localhost:3000/api/profesionales", {
        headers: { Authorization: token }
      });
      setProfesionales(resp.data.profesionales || resp.data);
    } catch (error) {
      console.error("Error al obtener profesionales", error);
    }
  };

  useEffect(() => {
    if (rol === "admin") {
      obtenerUsuarios();
      obtenerTurnos();
      obtenerProfesionales();
    }
  }, [rol]);

  if (rol !== "admin") {
    return (
      <div className="shell" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2 style={{ color: '#c20b0b', textAlign: 'center', fontWeight: 'bold' }}>
          Acceso Denegado: No tenés permisos de administrador.
        </h2>
      </div>
    );
  }

  return (
    <div className="shell" style={{ padding: '30px 20px', maxWidth: '1200px', margin: '0 auto', boxSizing: 'border-box' }}>
      
      {/* HEADER DEL PANEL ADMINISTRATIVO */}
      <div className="shell-top" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '35px',
        borderBottom: '2px solid #eef5f4',
        paddingBottom: '15px'
      }}>
        <h2 className="shell-title" style={{ color: '#0b4d48', margin: 0, fontSize: '28px', fontWeight: 'bold' }}>
          Panel de Administración
        </h2>
        
        {/* BOTÓN CERRAR SESIÓN ESTILIZADO */}
        <button 
          onClick={onLogout}
          style={{ 
            backgroundColor: '#ffebee', 
            color: '#b71c1c', 
            border: '1px solid #ffcdd2', 
            padding: '10px 20px', 
            borderRadius: '8px', 
            cursor: 'pointer', 
            fontWeight: 'bold',
            fontSize: '14px',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 5px rgba(183, 28, 28, 0.05)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#b71c1c';
            e.target.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#ffebee';
            e.target.style.color = '#b71c1c';
          }}
        >
           Cerrar Sesión
        </button>
      </div>

      {/* CUADRÍCULA DE SECCIONES DEL PANEL */}
      <div className="admin-grid" style={{ display: 'grid', gap: '30px' }}>
        {/* CRUD USUARIOS */}
        <AgregarAdmin onActualizar={obtenerUsuarios} />
        <UsuariosAdmin usuarios={usuarios} onActualizar={obtenerUsuarios} />
        
        {/* CRUD TURNOS */}
        <TurnosAdmin turnos={turnos} onActualizar={obtenerTurnos} token={token} />
        
        {/* CRUD PROFESIONALES */}
        <ProfesionalesAdmin 
          profesionales={profesionales} 
          onActualizar={obtenerProfesionales} 
          token={token} 
        />
      </div>
    </div>
  );
}