import { useState } from "react";

export default function FormularioTurno({ profesionales, agregarTurno }) {
  const [profesionalId, setProfesionalId] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [notas, setNotas] = useState("");

  function reservar(e) {
    e.preventDefault();
    if (!profesionalId || !fecha || !hora) return;

    agregarTurno({
      profesionalId,
      fecha,
      hora,
      notas,
    });

    setProfesionalId("");
    setFecha("");
    setHora("");
    setNotas("");
  }

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Sacar turno</h3>

      <form onSubmit={reservar} style={{ display: "grid", gap: 10 }}>
        <select
          className="field"
          value={profesionalId}
          onChange={(e) => setProfesionalId(e.target.value)}
        >
          <option value="">Elegí un profesional</option>
          {profesionales.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} — {p.especialidad}
            </option>
          ))}
        </select>

        <input
          className="field"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />

        <input
          className="field"
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />

        <input
          className="field"
          placeholder="Notas (opcional)"
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        />

        <button className="btn" type="submit" style={{ justifySelf: "start" }}>
          Reservar
        </button>
      </form>
    </div>
  );
}