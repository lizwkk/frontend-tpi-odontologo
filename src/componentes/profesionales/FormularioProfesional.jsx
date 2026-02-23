import { useState } from "react";

export default function FormularioProfesional({ agregarProfesional }) {
  const [nombre, setNombre] = useState("");
  const [especialidad, setEspecialidad] = useState("");

  function guardar(e) {
    e.preventDefault();
    if (!nombre.trim() || !especialidad.trim()) return;

    agregarProfesional({ nombre: nombre.trim(), especialidad: especialidad.trim() });
    setNombre("");
    setEspecialidad("");
  }

  return (
    <form onSubmit={guardar}>
      <h3 style={{ marginTop: 0 }}>Nuevo profesional</h3>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input
          className="field"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ flex: "1 1 220px" }}
        />

        <input
          className="field"
          placeholder="Especialidad"
          value={especialidad}
          onChange={(e) => setEspecialidad(e.target.value)}
          style={{ flex: "1 1 220px" }}
        />

        <button className="btn small" type="submit" style={{ flex: "0 0 auto" }}>
          Agregar
        </button>
      </div>
    </form>
  );
}