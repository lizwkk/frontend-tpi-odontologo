import { useEffect, useState } from "react";
import { useAuth } from "../contexto/AuthContext.jsx";

const API = "http://localhost:3000/api";

export function useProfesionales() {
  const { token } = useAuth();
  const [profesionales, setProfesionales] = useState([]);
  const [loading, setLoading] = useState(false);

  function headers() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  async function cargarProfesionales() {
    if (!token) return;
    setLoading(true);
    try {
      const r = await fetch(`${API}/profesionales`, { headers: headers() });
      const txt = await r.text();
      if (!r.ok) throw new Error(txt || "Error al listar profesionales");
      setProfesionales(JSON.parse(txt));
    } finally {
      setLoading(false);
    }
  }

  async function agregarProfesional({ nombre, especialidad }) {
    const r = await fetch(`${API}/profesionales`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ nombre, especialidad }),
    });
    const txt = await r.text();
    if (!r.ok) throw new Error(txt || "Error al crear profesional");
    await cargarProfesionales();
  }

  async function eliminarProfesional(id) {
    const r = await fetch(`${API}/profesionales/${id}`, {
      method: "DELETE",
      headers: headers(),
    });
    const txt = await r.text();
    if (!r.ok) throw new Error(txt || "Error al borrar profesional");
    setProfesionales((prev) => prev.filter((p) => p.id !== id));
  }

  useEffect(() => {
    cargarProfesionales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return { profesionales, loading, cargarProfesionales, agregarProfesional, eliminarProfesional };
}