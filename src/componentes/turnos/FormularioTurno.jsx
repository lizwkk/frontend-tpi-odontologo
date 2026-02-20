import { useState } from "react";

export default function FormularioTurno({ profesionales, agregarTurno }) {
  const [profId, setProfId] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [notas, setNotas] = useState("");

  function guardar(e) {
    e.preventDefault();
    if (!profId || !fecha || !hora) return;

    const profesional = profesionales.find((p) => String(p.id) === String(profId));

    agregarTurno({
      profesional: profesional ? profesional.nombre : "Profesional",
      fecha,
      hora,
      notas,
    });

    setProfId("");
    setFecha("");
    setHora("");
    setNotas("");
  }

  return (
    <form onSubmit={guardar} className="card">
      <h3>Sacar turno</h3>

      <select value={profId} onChange={(e) => setProfId(e.target.value)}>
        <option value="">Elegí un profesional</option>
        {profesionales.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nombre} - {p.especialidad}
          </option>
        ))}
      </select>

      <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
      <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
      <input placeholder="Notas (opcional)" value={notas} onChange={(e) => setNotas(e.target.value)} />

      <button>Reservar</button>
    </form>
  );
}