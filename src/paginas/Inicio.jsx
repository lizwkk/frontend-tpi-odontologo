import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProfesionales } from "../hooks/useProfesionales.jsx";
import { useTurnos } from "../contexto/TurnosContext.jsx";
import { useAuth } from "../contexto/AuthContext.jsx";

export default function Inicio() {
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();
  const { profesionales, loading } = useProfesionales();
  const { crearTurno } = useTurnos();

  const [profesional_id, setProfesionalId] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [notas, setNotas] = useState("");
  const [msg, setMsg] = useState("");

  async function reservar(e) {
    e.preventDefault();
    setMsg("");
    try {
      await crearTurno({ profesional_id: Number(profesional_id), fecha, hora, notas });
      setMsg("✅ Turno creado");
      setProfesionalId("");
      setFecha("");
      setHora("");
      setNotas("");
    } catch (err) {
      setMsg(`❌ ${err.message}`);
    }
  }

  return (
    <div className="shell">
      <div className="shell-top">
        <h2 className="shell-title">Consultorio odontológico</h2>

        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link className="shell-link" to="/mis-turnos">
            Ver mis turnos
          </Link>

          {isAdmin && (
            <Link className="shell-link" to="/admin">
              Admin
            </Link>
          )}

          <button
            className="btn"
            style={{ padding: "10px 14px" }}
            onClick={() => {
              logout();
              navigate("/home");
            }}
          >
            Salir
          </button>
        </div>
      </div>

      <div className="panel">
        <h3 style={{ marginTop: 0 }}>Sacar turno</h3>

        <form onSubmit={reservar} style={{ display: "grid", gap: 10 }}>
          <select className="field" value={profesional_id} onChange={(e) => setProfesionalId(e.target.value)} required>
            <option value="">{loading ? "Cargando..." : "Elegí un profesional"}</option>
            {profesionales.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} — {p.especialidad}
              </option>
            ))}
          </select>

          <input className="field" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
          <input className="field" type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />
          <input className="field" placeholder="Notas (opcional)" value={notas} onChange={(e) => setNotas(e.target.value)} />

          {msg && <p style={{ margin: 0 }}>{msg}</p>}

          <button className="btn" type="submit" style={{ justifySelf: "start" }}>
            Reservar
          </button>
        </form>
      </div>
    </div>
  );
}