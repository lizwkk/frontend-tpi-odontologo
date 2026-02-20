import { useState } from "react";

export function useProfesionales() {
  const [profesionales, setProfesionales] = useState([]);

  function agregarProfesional(prof) {
    const nuevo = {
      id: Date.now(), // simula id de BD
      activo: true,
      ...prof,
    };
    setProfesionales([...profesionales, nuevo]);
  }

  function eliminarProfesional(id) {
    setProfesionales(profesionales.filter((p) => p.id !== id));
  }

  function toggleActivo(id) {
    setProfesionales(
      profesionales.map((p) =>
        p.id === id ? { ...p, activo: !p.activo } : p
      )
    );
  }

  return {
    profesionales,
    agregarProfesional,
    eliminarProfesional,
    toggleActivo,
    setProfesionales,
  };
}