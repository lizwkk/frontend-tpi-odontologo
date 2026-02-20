import { useState } from "react";

export function useTurnos() {
  const [turnos, setTurnos] = useState([]);

  // turno ejemplo:
  // { id, profesional, fecha, hora, estado: "RESERVADO", notas }

  function agregarTurno(turno) {
    const nuevo = {
      id: Date.now(),
      estado: "RESERVADO",
      ...turno,
    };
    setTurnos([...turnos, nuevo]);
  }

  function cancelarTurno(id) {
    setTurnos(
      turnos.map((t) =>
        t.id === id ? { ...t, estado: "CANCELADO" } : t
      )
    );
  }

  function eliminarTurno(id) {
    setTurnos(turnos.filter((t) => t.id !== id));
  }

  function limpiarTurnos() {
    setTurnos([]);
  }

  return {
    turnos,
    agregarTurno,
    cancelarTurno,
    eliminarTurno,
    limpiarTurnos,
  };
}