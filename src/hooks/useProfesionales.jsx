import { useEffect, useState } from "react";
// BORRAMOS la línea de useAuth que tiraba error
import axios from "axios"; // Asegurate de tener axios o usá fetch

const API = "http://localhost:3000/api";

export function useProfesionales() {
  const [profesionales, setProfesionales] = useState([]);

  useEffect(() => {
    // Aquí tu lógica para traer los datos
    axios.get(`${API}/profesionales`)
      .then(res => setProfesionales(res.data))
      .catch(err => console.error(err));
  }, []);

  return { profesionales };
}