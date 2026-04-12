import { useEffect, useState } from "react";
import axios from "axios";

export function useProfesionales() {
  const [profesionales, setProfesionales] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarDatos = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        console.warn("Esperando el token...");
        return;
      }

      const res = await axios.get("http://localhost:3000/api/profesionales", {
        headers: { Authorization: token }
      });
      
      setProfesionales(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error al traer profesionales:", err.response?.data || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []); // Se ejecuta al montar

  return { profesionales, loading };
}