import { createContext, useContext, useState } from "react";

const TurnosContext = createContext(null);

export function TurnosProvider({ children }) {
  const [turnos, setTurnos] = useState([]);

  function agregarTurno(turno) {
    const nuevo = { id: Date.now(), estado: "RESERVADO", ...turno };
    setTurnos((prev) => [...prev, nuevo]);
  }

  function cancelarTurno(id) {
    setTurnos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, estado: "CANCELADO" } : t))
    );
  }

  function eliminarTurno(id) {
    setTurnos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <TurnosContext.Provider value={{ turnos, agregarTurno, cancelarTurno, eliminarTurno }}>
      {children}
    </TurnosContext.Provider>
  );
}

export function useTurnos() {
  const ctx = useContext(TurnosContext);
  if (!ctx) throw new Error("useTurnos debe usarse dentro de <TurnosProvider>");
  return ctx;
}