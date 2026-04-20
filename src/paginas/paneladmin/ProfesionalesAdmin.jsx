import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfesionalesAdmin() {
  const [profesionales, setProfesionales] = useState([]);
  const token = localStorage.getItem("token");

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
    if (!window.confirm("¿Borrar médico?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/profesionales/${id}`, {
        headers: { Authorization: token }
      });
      cargar();
    } catch (err) { alert("Error al eliminar"); }
  };

  return (
    <div className="panel">
      {/* Usamos tus componentes chiquitos aquí dentro */}
      <FormularioProfesional agregarProfesional={agregar} />
      <hr style={{ margin: "20px 0", opacity: 0.2 }} />
      <ListadoProfesionales profesionales={profesionales} eliminarProfesional={eliminar} />
    </div>
  );
}