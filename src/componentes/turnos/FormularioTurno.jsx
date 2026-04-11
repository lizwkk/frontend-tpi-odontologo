import { useState } from "react";

export default function FormularioTurno({ profesionales, crearTurno }) {
  const [profesional_id, setProfesionalId] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [notas, setNotas] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setOk("");

    try {
      await crearTurno({
        profesional_id: Number(profesional_id),
        fecha,
        hora,
        notas,
      });
      setOk("Turno reservado ✅");
      setFecha("");
      setHora("");
      setNotas("");
    } catch (err) {
      setError(err.message || "Error");
    }
  }

  return (
    <div>
      <h3>Sacar turno</h3>

      <form onSubmit={onSubmit}>
        <select
          value={profesional_id}
          onChange={(e) => setProfesionalId(e.target.value)}
          required
        >
          <option value="">Elegí un profesional</option>
          {profesionales.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} — {p.especialidad}
            </option>
          ))}
        </select>

        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
        <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />

        <input
          placeholder="Notas (opcional)"
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        />

        <button type="submit">Reservar</button>

        {error && <p style={{ color: "crimson" }}>✖ {error}</p>}
        {ok && <p style={{ color: "green" }}>{ok}</p>}
      </form>
    </div>
  );
}