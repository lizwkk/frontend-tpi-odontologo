export default function ListadoTurnos({ turnos, cancelarTurno, eliminarTurno }) {
  return (
    <div className="card">
      <h3>Mis turnos</h3>

      {turnos.length === 0 && <p className="muted">Todavía no tenés turnos.</p>}

      {turnos.map((t) => (
        <div key={t.id} className="row between" style={{ padding: "8px 0" }}>
          <div>
            <b>{t.fecha} {t.hora}</b>
            <div className="muted">
              {t.profesional} — Estado: {t.estado}
            </div>
          </div>

          <div className="row">
            {t.estado === "RESERVADO" && (
              <button className="btn secondary" onClick={() => cancelarTurno(t.id)}>
                Cancelar
              </button>
            )}
            <button className="btn secondary" onClick={() => eliminarTurno(t.id)}>
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}