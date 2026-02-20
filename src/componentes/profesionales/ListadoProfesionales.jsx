export default function ListadoProfesionales({ profesionales, eliminarProfesional }) {
  return (
    <div>
      <h3>Profesionales</h3>

      {profesionales.map((p) => (
        <div key={p.id}>
          <strong>{p.nombre}</strong> – {p.especialidad}

          <button onClick={() => eliminarProfesional(p.id)}>
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}