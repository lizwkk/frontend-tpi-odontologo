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
          <p style={{ textAlign: 'center', padding: '20px' }}>No tenés turnos todavía.</p>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {misTurnos.map((t) => (
              <div key={t.id} className="itemRow" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', borderBottom: '1px solid #eee', background: 'white', borderRadius: '8px' }}>
                <div>
                  <b style={{ color: '#2c3e50', fontSize: '1.1em' }}>{t.profesional_nombre}</b>
                  <div className="muted" style={{ fontSize: '0.9em', color: '#666', marginTop: '5px' }}>
                    <span>📅 {t.fecha && t.fecha !== "0000-00-00" ? new Date(t.fecha).toLocaleDateString() : "Fecha a confirmar"}</span>
                    <span style={{ marginLeft: '10px' }}>⏰ {t.hora ? t.hora.substring(0, 5) : "--:--"} hs</span>
                  </div>
                  <div style={{ fontSize: '0.85em', color: '#888', marginTop: '4px' }}>
                    Estado: <span style={{ 
                      fontWeight: 'bold', 
                      color: (t.estado === 'reservado' || !t.estado) ? '#27ae60' : '#c0392b',
                      textTransform: 'capitalize'
                    }}>
                      {t.estado || "reservado"}
                    </span>
                  </div>
                  {t.notas && <div style={{fontSize: '0.8em', fontStyle: 'italic', marginTop: '5px', color: '#555'}}>Nota: {t.notas}</div>}
                </div>

                <button 
                  className="btn-delete" 
                  onClick={() => borrar(t.id)} 
                  style={{ 
                    backgroundColor: '#c20b0b', 
                    color: 'white', 
                    border: 'none', 
                    padding: '8px 15px', 
                    borderRadius: '5px', 
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
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