import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexto/AuthContext.jsx";
import { useTurnos } from "../contexto/TurnosContext.jsx";
import { useProfesionales } from "../hooks/useProfesionales.jsx";

export default function Admin() {
  const { isAdmin } = useAuth();
  const { turnosAll, cargarTurnosAll, adminEliminarTurno } = useTurnos();
  const { profesionales, agregarProfesional, eliminarProfesional } = useProfesionales();

  const [nombre, setNombre] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!isAdmin) return;
    cargarTurnosAll().catch((e) => setMsg(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="shell">
        <div className="shell-top">
          <h2 className="shell-title">Administración</h2>
          <Link className="shell-link" to="/inicio">
            Volver
          </Link>
        </div>
        <p style={{ color: "crimson" }}>Solo admin</p>
      </div>
    );
  }

  async function onAddProf(e) {
    e.preventDefault();
    setMsg("");
    try {
      await agregarProfesional({ nombre, especialidad });
      setNombre("");
      setEspecialidad("");
    } catch (e2) {
      setMsg(e2.message);
    }
  }

  async function borrarTurno(id) {
    setMsg("");
    try {
      await adminEliminarTurno(id);
    } catch (e) {
      setMsg(e.message);
    }
  }

  return (
    <div className="shell">
      <div className="shell-top">
        <h2 className="shell-title">Administración</h2>
        <Link className="shell-link" to="/inicio">
          Volver
        </Link>
      </div>

      {msg && <p>{msg}</p>}

      {/* PROFESIONALES */}
      <div className="panel" style={{ marginBottom: 14 }}>
        <h3 style={{ marginTop: 0 }}>Profesionales</h3>

        <form onSubmit={onAddProf} style={{ display: "grid", gap: 10 }}>
          <input className="field" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          <input className="field" placeholder="Especialidad" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} required />
          <button className="btn" type="submit" style={{ justifySelf: "start" }}>
            Agregar profesional
          </button>
        </form>

        <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
          {profesionales.map((p) => (
            <div key={p.id} className="itemRow">
              <div>
                <b>{p.nombre}</b> — {p.especialidad}
              </div>
              <button className="btn" onClick={() => eliminarProfesional(p.id)}>
                Borrar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* TURNOS ALL */}
      <div className="panel">
        <h3 style={{ marginTop: 0 }}>Turnos (todos)</h3>

        {turnosAll.length === 0 ? (
          <p>No hay turnos todavía.</p>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {turnosAll.map((t) => (
              <div key={t.id} className="itemRow">
                <div>
                  <b>{t.usuario_nombre}</b> ({t.usuario_email}) — <b>{t.profesional_nombre}</b>
                  <div className="muted">
                    {String(t.fecha).slice(0, 10)} • {t.hora} • {t.estado}
                  </div>
                </div>
                <button className="btn" onClick={() => borrarTurno(t.id)}>
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