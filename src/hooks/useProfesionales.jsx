import { useEffect, useState } from "react";
import axios from "axios";

export function useProfesionales() {
  const [profesionales, setProfesionales] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarDatos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/profesionales");
      setProfesionales(res.data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return { profesionales, loading };
}