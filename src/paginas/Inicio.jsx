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
    if (!profesional_id) return setMsg("❌ Por favor, elegí un profesional");

    try {
      const resp = await axios.post("http://localhost:3000/api/turnos", 
        { 
          id_profesional: Number(profesional_id), 
          fecha, 
          hora, 
          notas 
        },
        { headers: { Authorization: token } }
      );

      if (resp.status === 201 || resp.data.status === "ok") {
        setMsg("✅ ¡Turno reservado!");
        setProfesionalId(""); setFecha(""); setHora(""); setNotas("");
      }
    } catch (err) {
      console.error(err);
      setMsg("❌ Error: " + (err.response?.data?.message || "No autorizado"));
    }
  }

  return (
    <div className="shell">
      <div className="shell-top">
        <h2>Hola, {nombreUsuario}</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link href="/mis-turnos" className="shell-link">Mis Turnos</Link>
          <button onClick={onLogout} className="logout-button">Salir</button>
        </div>
      </div>

      <div className="panel">
        <form onSubmit={reservar} style={{ display: "grid", gap: "10px" }}>
          <select className="field" value={profesional_id} onChange={e => setProfesionalId(e.target.value)} required>
            <option value="">{loading ? "Cargando..." : "Elegí un profesional"}</option>
            {profesionales.map(p => (
              <option key={p.id} value={p.id}>{p.nombre} ({p.especialidad})</option>
            ))}
          </select>
          <input type="date" className="field" value={fecha} onChange={e => setFecha(e.target.value)} required />
          <input type="time" className="field" value={hora} onChange={e => setHora(e.target.value)} required />
          <input placeholder="Notas" className="field" value={notas} onChange={e => setNotas(e.target.value)} />
          <button type="submit" className="btn">Reservar Turno</button>
          {msg && <p style={{ textAlign: "center", color: msg.includes('✅') ? 'green' : 'red' }}>{msg}</p>}
        </form>
      </div>
    </div>
  );
}