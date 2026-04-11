import { createContext, useContext, useMemo, useState } from "react";
import { useAuth } from "./AuthContext.jsx";

const TurnosContext = createContext(null);
const API = "http://localhost:3000/api";

export function TurnosProvider({ children }) {
  const { token } = useAuth();

  const [misTurnos, setMisTurnos] = useState([]);
  const [turnosAll, setTurnosAll] = useState([]);

  function authHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  // USER
  async function cargarMisTurnos() {
    const r = await fetch(`${API}/turnos`, { headers: authHeaders() });
    const txt = await r.text();
    if (!r.ok) throw new Error(txt || "Error al cargar turnos");
    setMisTurnos(JSON.parse(txt));
  }

  async function crearTurno({ profesional_id, fecha, hora, notas }) {
    const r = await fetch(`${API}/turnos`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ profesional_id, fecha, hora, notas }),
    });
    const txt = await r.text();
    if (!r.ok) throw new Error(txt || "Error al crear turno");
    await cargarMisTurnos();
  }

  async function eliminarMiTurno(id) {
    const r = await fetch(`${API}/turnos/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    const txt = await r.text();
    if (!r.ok) throw new Error(txt || "Error al eliminar turno");
    setMisTurnos((prev) => prev.filter((t) => t.id !== id));
  }

  // ADMIN
  async function cargarTurnosAll() {
    const r = await fetch(`${API}/turnos/all`, { headers: authHeaders() });
    const txt = await r.text();
    if (!r.ok) throw new Error(txt || "Error al cargar turnos (admin)");
    setTurnosAll(JSON.parse(txt));
  }

  async function adminEliminarTurno(id) {
    const r = await fetch(`${API}/turnos/admin/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    const txt = await r.text();
    if (!r.ok) throw new Error(txt || "Error al borrar turno (admin)");
    setTurnosAll((prev) => prev.filter((t) => t.id !== id));
  }

  const value = useMemo(
    () => ({
      misTurnos,
      turnosAll,
      cargarMisTurnos,
      crearTurno,
      eliminarMiTurno,
      cargarTurnosAll,
      adminEliminarTurno,
    }),
    [misTurnos, turnosAll, token]
  );

  return <TurnosContext.Provider value={value}>{children}</TurnosContext.Provider>;
}

export function useTurnos() {
  const ctx = useContext(TurnosContext);
  if (!ctx) throw new Error("useTurnos debe usarse dentro de <TurnosProvider>");
  return ctx;
}