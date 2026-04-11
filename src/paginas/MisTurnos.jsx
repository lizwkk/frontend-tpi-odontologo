import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTurnos } from "../contexto/TurnosContext.jsx";

export default function MisTurnos() {
  const { misTurnos, cargarMisTurnos, eliminarMiTurno } = useTurnos();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    cargarMisTurnos().catch((e) => setMsg(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function borrar(id) {
    setMsg("");
    try {
      await eliminarMiTurno(id);
    } catch (e) {
      setMsg(e.message);
    }
  }

  return (
    <div className="shell">
      <div className="shell-top">
        <h2 className="shell-title">Mis turnos</h2>
        <Link className="shell-link" to="/inicio">
          Volver
        </Link>
      </div>

      {msg && <p>{msg}</p>}

      <div className="panel">
        {misTurnos.length === 0 ? (
          <p>No tenés turnos todavía.</p>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {misTurnos.map((t) => (
              <div key={t.id} className="itemRow">
                <div>
                  <b>{t.profesional_nombre}</b> — {t.profesional_especialidad}
                  <div className="muted">
                    {String(t.fecha).slice(0, 10)} • {t.hora} • {t.estado}
                  </div>
                  {t.notas && <div className="muted">Nota: {t.notas}</div>}
                </div>

                <button className="btn" onClick={() => borrar(t.id)}>
                  Borrar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}