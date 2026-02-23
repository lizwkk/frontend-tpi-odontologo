export default function ListadoProfesionales({ profesionales, eliminarProfesional }) {
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Profesionales</h3>

      {profesionales.length === 0 ? (
        <p style={{ margin: 0, color: "var(--muted)" }}>
          Todavía no agregaste profesionales.
        </p>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {profesionales.map((p) => (
            <div
              key={p.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                padding: 10,
                border: "1px solid var(--border)",
                borderRadius: 12,
                background: "rgba(255,255,255,.9)",
              }}
            >
              <div>
                <strong>{p.nombre}</strong>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>
                  {p.especialidad}
                </div>
              </div>

              <button
                className="btn ghost small"
                type="button"
                onClick={() => eliminarProfesional(p.id)}
                title="Eliminar profesional"
                style={{ borderColor: "rgba(239,68,68,.35)" }}
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}