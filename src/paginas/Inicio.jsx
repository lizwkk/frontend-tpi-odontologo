import { useState } from "react";
import axios from "axios";
import { useLocation } from "wouter";
import { useProfesionales } from "../hooks/useProfesionales.jsx";

export default function Inicio({ onLogout }) {
  const { profesionales, loading } = useProfesionales();
  const [profesional_id, setProfesionalId] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [notas, setNotas] = useState("");
  const [msg, setMsg] = useState({ tipo: "", texto: "" });
  const [, setLocation] = useLocation();

  const nombreUsuario = localStorage.getItem("nombre") || "Paciente";
  const token = localStorage.getItem("token");

  async function reservar(e) {
    e.preventDefault();
    setMsg({ tipo: "", texto: "" });
    const tokenLimpio = token?.replace("Bearer ", "").trim();

    try {
      await axios.post("http://localhost:3000/api/turnos", 
        { id_profesional: Number(profesional_id), fecha, hora, notas },
        { headers: { Authorization: tokenLimpio } }
      );
      setMsg({ tipo: "ok", texto: "✅ ¡Turno reservado con éxito!" });
      setFecha(""); setHora(""); setNotas(""); setProfesionalId("");
    } catch (err) {
      setMsg({ tipo: "error", texto: "❌ Error al reservar. Intentá de nuevo." });
    }
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
      {/* HEADER UNIFICADO */}
      <header style={{ backgroundColor: "#0b4d48", color: "white", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "24px" }}>Sonrisa Austral</h1>
          <p style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>Hola, {nombreUsuario}</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setLocation("/mis-turnos")} style={{ background: "white", color: "#0b4d48", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>Mis Turnos</button>
          <button onClick={onLogout} style={{ background: "#dc3545", color: "white", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}>Salir</button>
        </div>
      </header>

      {/* CONTENEDOR DE FORMULARIO */}
      <div style={{ maxWidth: "600px", margin: "40px auto", padding: "30px", backgroundColor: "white", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <h2 style={{ color: "#0b4d48", textAlign: "center" }}>Nueva Reserva</h2>
        
        {msg.texto && (
          <p style={{ padding: "10px", borderRadius: "5px", textAlign: "center", backgroundColor: msg.tipo === "ok" ? "#d4edda" : "#f8d7da" }}>
            {msg.texto}
          </p>
        )}

        <form onSubmit={reservar} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <select value={profesional_id} onChange={(e) => setProfesionalId(e.target.value)} required style={{ padding: "12px", borderRadius: "6px", border: "1px solid #cedddc" }}>
            <option value="">Elegí un profesional</option>
            {profesionales.map(p => <option key={p.id} value={p.id}>{p.nombre} — {p.especialidad}</option>)}
          </select>

          <div style={{ display: "flex", gap: "10px" }}>
            <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} required style={{ flex: 1, padding: "12px", borderRadius: "6px", border: "1px solid #cedddc" }} />
            <input type="time" value={hora} onChange={e => setHora(e.target.value)} required style={{ flex: 1, padding: "12px", borderRadius: "6px", border: "1px solid #cedddc" }} />
          </div>

          <textarea placeholder="Notas adicionales (opcional)" value={notas} onChange={e => setNotas(e.target.value)} style={{ padding: "12px", borderRadius: "6px", border: "1px solid #cedddc" }} />

          <button type="submit" style={{ backgroundColor: "#14857c", color: "white", padding: "12px", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>Confirmar Reserva</button>
        </form>
      </div>
    </div>
  );
}