import { useLocation, Link } from "wouter";
import { useState, useEffect } from "react";
import axios from "axios";
import { useProfesionales } from "../hooks/useProfesionales.jsx";

export default function Inicio({ onLogout }) {
  const { profesionales, loading } = useProfesionales();
  const [profesional_id, setProfesionalId] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [notas, setNotas] = useState("");
  const [msg, setMsg] = useState("");

  const nombreUsuario = localStorage.getItem("nombre") || "Paciente";
 const token = localStorage.getItem("token");

  async function reservar(e) {
    e.preventDefault();
    setMsg(""); 

    
    if (!profesional_id) return setMsg("❌ Por favor, elegí un profesional");
    if (!token) return setMsg("❌ No hay sesión activa. Volvé a loguearte.");

    try {
      const resp = await axios.post("http://localhost:3000/api/turnos", 
        { 
          id_profesional: Number(profesional_id), 
          fecha, 
          hora, 
          notas 
        },
        { 
          headers: { 
            // IMPORTANTE: Agregar "Bearer " antes del token
            Authorization: token 
          } 
        }
      );

      if (resp.status === 201 || resp.data.status === "ok") {
        setMsg("✅ ¡Turno reservado con éxito!");
        setProfesionalId(""); 
        setFecha(""); 
        setHora(""); 
        setNotas("");
      }
    } catch (err) {
      console.error("Error en reserva:", err.response);
      if (err.response?.status === 401) {
        setMsg("❌ Sesión expirada. Por favor, salí y volvé a entrar.");
      } else {
        setMsg("❌ Error: " + (err.response?.data?.message || "No se pudo realizar la reserva"));
      }
    }
  }

  return (
    <div className="shell">
      <div className="shell-top">
        <h2 className="shell-title">Hola, {nombreUsuario}</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link href="/mis-turnos" className="shell-link">Mis Turnos</Link>
          <button onClick={onLogout} className="logout-button">Salir</button>
        </div>
      </div>

      <div className="panel">
        <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>Reservar un nuevo turno</h3>
        <form onSubmit={reservar} style={{ display: "grid", gap: "12px" }}>
          
          <label style={{ fontSize: '0.9em', color: '#666' }}>Profesional:</label>
          <select 
            className="field" 
            value={profesional_id} 
            onChange={e => setProfesionalId(e.target.value)} 
            required
          >
            <option value="">{loading ? "Cargando profesionales..." : "Seleccioná un especialista"}</option>
            {profesionales.map(p => (
              <option key={p.id} value={p.id}>{p.nombre} — {p.especialidad}</option>
            ))}
          </select>

          <label style={{ fontSize: '0.9em', color: '#666' }}>Fecha:</label>
          <input 
            type="date" 
            className="field" 
            value={fecha} 
            onChange={e => setFecha(e.target.value)} 
            required 
          />

          <label style={{ fontSize: '0.9em', color: '#666' }}>Hora:</label>
          <input 
            type="time" 
            className="field" 
            value={hora} 
            onChange={e => setHora(e.target.value)} 
            required 
          />

          <label style={{ fontSize: '0.9em', color: '#666' }}>Notas adicionales:</label>
          <input 
            placeholder="Ej: Primera consulta, control, etc." 
            className="field" 
            value={notas} 
            onChange={e => setNotas(e.target.value)} 
          />

          <button type="submit" className="btn" style={{ marginTop: '10px' }}>
            Confirmar Reserva
          </button>

          {msg && (
            <p style={{ 
              textAlign: "center", 
              fontWeight: 'bold',
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: msg.includes('✅') ? '#d4edda' : '#f8d7da',
              color: msg.includes('✅') ? '#155724' : '#721c24',
              marginTop: '10px'
            }}>
              {msg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}