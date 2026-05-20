export default function ListadoProfesionales({ profesionales, eliminarProfesional, editarProfesional }) {
  
  const manejarEdicion = (p) => {
    const nuevoNombre = prompt("Modificar nombre del profesional:", p.nombre);
    // Si presiona cancelar en el primer prompt, frena el proceso
    if (nuevoNombre === null) return; 

    const nuevaEspecialidad = prompt("Modificar especialidad:", p.especialidad);
    // Si presiona cancelar en el segundo prompt, también frena
    if (nuevaEspecialidad === null) return;

    // Si completó ambos campos, enviamos los datos limpios de espacios al componente padre
    if (nuevoNombre.trim() !== "" && nuevaEspecialidad.trim() !== "") {
      editarProfesional(p.id, nuevoNombre.trim(), nuevaEspecialidad.trim());
    } else {
      alert("Los campos no pueden quedar vacíos.");
    }
  };

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

              {/* Contenedor para alinear los dos botones juntos */}
              <div style={{ display: "flex", gap: 8 }}>
                {/* ✏️ BOTÓN NUEVO PARA ACTUALIZAR */}
                <button
                  className="btn ghost small"
                  type="button"
                  onClick={() => manejarEdicion(p)}
                  title="Editar profesional"
                  style={{ borderColor: "rgba(0,123,255,.35)", cursor: "pointer" }}
                >
                  Editar
                </button>

                {/* ❌ BOTÓN PARA ELIMINAR */}
                <button
                  className="btn ghost small"
                  type="button"
                  onClick={() => eliminarProfesional(p.id)}
                  title="Eliminar profesional"
                  style={{ borderColor: "rgba(239,68,68,.35)", cursor: "pointer" }}
                >
                  ❌
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}