import { useState, useEffect } from "react";
import axios from "axios";
import FormularioProfesional from "../../componentes/profesionales/FormularioProfesional.jsx";
import ListadoProfesionales from "../../componentes/profesionales/ListadoProfesionales.jsx";

export default function ProfesionalesAdmin({ token }) {
  const [profesionales, setProfesionales] = useState([]);

  const cargar = async () => {
    try {
      const resp = await axios.get("http://localhost:3000/api/profesionales");
      setProfesionales(resp.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { cargar(); }, []);

  const agregar = async (nuevo) => {
    try {
      await axios.post("http://localhost:3000/api/profesionales", nuevo, {
        headers: { Authorization: token }
      });
      cargar();
    } catch (err) { alert("Error al agregar"); }
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Borrar profesional?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/profesionales/${id}`, {
        headers: { Authorization: token }
      });
      cargar();
    } catch (err) { alert("Error al eliminar"); }
  };

  return (
    <div className="panel">
      <FormularioProfesional agregarProfesional={agregar} />
      <hr style={{margin: '20px 0'}} />
      <ListadoProfesionales profesionales={profesionales} eliminarProfesional={eliminar} />
    </div>
  );
}