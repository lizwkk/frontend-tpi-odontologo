import { useState } from "react";

export default function FormularioProfesional({ agregarProfesional }) {
  const [nombre, setNombre] = useState("");
  const [especialidad, setEspecialidad] = useState("");

  function guardar(e) {
    e.preventDefault();
    if (!nombre || !especialidad) return;

    agregarProfesional({ nombre, especialidad });
    setNombre("");
    setEspecialidad("");
  }

  return (
    <form onSubmit={guardar}>
      <h3>Nuevo profesional</h3>

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        placeholder="Especialidad"
        value={especialidad}
        onChange={(e) => setEspecialidad(e.target.value)}
      />

      <button>Agregar</button>
    </form>
  );
}
