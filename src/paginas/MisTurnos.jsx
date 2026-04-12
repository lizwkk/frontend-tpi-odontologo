import { useEffect, useState } from "react";
import { Link } from "wouter";
import axios from "axios";

export default function MisTurnos() {
  const [misTurnos, setMisTurnos] = useState([]);
  const [msg, setMsg] = useState("");
  const token = localStorage.getItem("token");

  const cargarTurnos = async () => {
    try {
      const resp = await axios.get("http://localhost:3000/api/turnos/mis-turnos", {
        headers: { Authorization: token }
      });
      setMisTurnos(resp.data);
    } catch (e) {
      console.error(e);
      setMsg("No se pudieron cargar tus turnos");
    }
  };

  useEffect(() => {
    if (token) cargarTurnos();
  }, [token]);

  async function borrar(id) {
    if (!window.confirm("¿Seguro que querés cancelar este turno?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/turnos/${id}`, {
        headers: { Authorization: token }
      });
      cargarTurnos(); 
    } catch (e) {
      setMsg("Error al cancelar el turno");
    }
  }

  return (
    <div className="shell">
      <div className="shell-top">
        <h2 className="shell-title">Mis turnos</h2>
        <Link className="shell-link" href="/inicio">
          Volver
        </Link>
      </div>

      {msg && <p className="auth-error" style={{color: 'red', textAlign: 'center'}}>{msg}</p>}

      <div className="panel">
        {misTurnos.length === 0 ? (
          <p>No tenés turnos todavía.</p>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {misTurnos.map((t) => (
              <div key={t.id_turno} className="itemRow" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' }}>
                <div>
                  <b>{t.profesional_nombre}</b> — {t.especialidad}
                  <div className="muted" style={{ fontSize: '0.9em', color: '#666' }}>
                    {t.fecha} • {t.hora} • {t.estado}
                  </div>
                </div>

                <button 
                  className="btn-delete" 
                  onClick={() => borrar(t.id_turno)} 
                  style={{ backgroundColor: '#c20b0b', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Cancelar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}