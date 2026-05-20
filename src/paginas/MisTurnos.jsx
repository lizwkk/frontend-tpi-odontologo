import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "wouter";

export default function MisTurnos({ onLogout }) {
  const [turnos, setTurnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });
  const [confirmarId, setConfirmarId] = useState(null); // Estado para el modal limpio
  const [, setLocation] = useLocation();

  const token = localStorage.getItem("token");
  const nombre = localStorage.getItem("nombre") || "Paciente";

  const cargarTurnos = async () => {
    try {
      const resp = await axios.get("http://localhost:3000/api/turnos/mis-turnos", {
        headers: { Authorization: token },
      });
      setTurnos(resp.data || []);
    } catch (err) {
      console.error("Error al cargar turnos:", err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (!token) { setLocation("/login"); return; }
    cargarTurnos();
  }, [token]);

  const eliminarTurno = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/turnos/${id}`, { headers: { Authorization: token } });
      setTurnos((prev) => prev.filter((t) => t.id !== id));
      setMensaje({ tipo: "ok", texto: "✔ Turno eliminado correctamente" });
      setConfirmarId(null);
      setTimeout(() => setMensaje({ tipo: "", texto: "" }), 3000);
    } catch (err) { 
      alert("No se pudo eliminar el turno."); 
      setConfirmarId(null);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
      {/* HEADER INSTITUCIONAL */}
      <header style={{ backgroundColor: "#0b4d48", color: "white", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "24px" }}>Sonrisa Austral</h1>
          <p style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>Mis Turnos Programados</p>
        </div>
        <div style={{ display: "flex", gap: "15px" }}>
          <button onClick={() => setLocation("/inicio")} style={{ background: "white", color: "#0b4d48", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>← Volver al Inicio</button>
        </div>
      </header>

      {/* LISTADO DE TURNOS */}
      <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
        <h2 style={{ color: "#0b4d48" }}>Agenda de {nombre}</h2>
        {mensaje.texto && <div style={{ padding: "10px", marginBottom: "15px", backgroundColor: "#e8f5e9", color: "#2e7d32", borderRadius: "6px", fontWeight: "bold", textAlign: "center" }}>{mensaje.texto}</div>}
        
        {cargando ? <p>Cargando tus citas...</p> : (
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {turnos.length === 0 ? <p>No tenés turnos programados.</p> : turnos.map(t => (
              <div key={t.id} style={{ padding: "20px", background: "white", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "16px" }}>📅 {t.fecha ? new Date(t.fecha).toLocaleDateString("es-AR") : ""} — {t.hora} hs</div>
                  <div style={{ fontSize: "14px", color: "#666" }}>Profesional: {t.profesional_nombre}</div>
                </div>
                <button onClick={() => setConfirmarId(t.id)} style={{ background: "none", border: "1px solid #dc3545", color: "#dc3545", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Eliminar</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL DE CONFIRMACIÓN PROFESIONAL */}
      {confirmarId && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "white", padding: "25px", borderRadius: "10px", textAlign: "center", maxWidth: "300px", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
            <h3>¿Estás segur@ que quieres eliminar este turno?</h3>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
              <button onClick={() => eliminarTurno(confirmarId)} style={{ padding: "10px 20px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Sí, eliminar</button>
              <button onClick={() => setConfirmarId(null)} style={{ padding: "10px 20px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}