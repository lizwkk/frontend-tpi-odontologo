import { useLocation, Link } from "wouter";
import { useState, useEffect } from "react";
import axios from "axios";
import { useProfesionales } from "../hooks/useProfesionales.jsx";

export default function Inicio({ onLogout }) {
  const [, setLocation] = useLocation();
  // El hook useProfesionales también debería usar el puerto 3000 adentro
  const { profesionales, loading } = useProfesionales();
  
  const [profesional_id, setProfesionalId] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [notas, setNotas] = useState("");
  const [msg, setMsg] = useState("");

  const nombreUsuario = localStorage.getItem("nombre") || "Paciente";
  const rol = localStorage.getItem("rol");
  const token = localStorage.getItem("token");

  async function reservar(e) {
    e.preventDefault();
    setMsg("");
    
    try {
      // CAMBIADO A PUERTO 3000
      const resp = await axios.post(
        "http://localhost:3000/api/turnos/crear", 
        { 
          profesional_id: Number(profesional_id), 
          fecha, 
          hora, 
          notas 
        },
        { headers: { Authorization: token } }
      );

      if (resp.data.status === "ok") {
        setMsg("✅ Turno creado con éxito");
        setProfesionalId("");
        setFecha("");
        setHora("");
        setNotas("");
      }
    } catch (err) {
      console.error(err);
      setMsg(`❌ ${err.response?.data?.message || "Error al conectar con el servidor"}`);
    }
  }

  return (
    <div className="shell">
      <div className="shell-top">
        <h2 className="shell-title">Hola, {nombreUsuario}</h2>

        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link className="shell-link" href="/mis-turnos">
            Ver mis turnos
          </Link>

          {rol === "admin" && (
            <Link className="shell-link" href="/admin">
              Panel Admin
            </Link>
          )}

          <button className="logout-button" onClick={onLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="panel">
        <h3 style={{ marginTop: 0 }}>Sacar un nuevo turno</h3>

        <form onSubmit={reservar} style={{ display: "grid", gap: 10 }}>
          <select 
            className="field" 
            value={profesional_id} 
            onChange={(e) => setProfesionalId(e.target.value)} 
            required
          >
            <option value="">
              {loading ? "Cargando profesionales..." : "Elegí un profesional"}
            </option>
            {profesionales.map((p) => (
              <option key={p.id_profesional} value={p.id_profesional}>
                {p.nombre} — {p.especialidad}
              </option>
            ))}
          </select>

          <input 
            className="field" 
            type="date" 
            value={fecha} 
            onChange={(e) => setFecha(e.target.value)} 
            required 
          />
          
          <input 
            className="field" 
            type="time" 
            value={hora} 
            onChange={(e) => setHora(e.target.value)} 
            required 
          />
          
          <input 
            className="field" 
            placeholder="Notas o motivo de la consulta (opcional)" 
            value={notas} 
            onChange={(e) => setNotas(e.target.value)} 
          />

          {msg && <p style={{ fontWeight: "bold", textAlign: "center", color: msg.includes('✅') ? 'green' : 'red' }}>{msg}</p>}

          <button className="btn" type="submit" style={{ justifySelf: "start" }}>
            Reservar Turno
          </button>
        </form>
      </div>
    </div>
  );
}