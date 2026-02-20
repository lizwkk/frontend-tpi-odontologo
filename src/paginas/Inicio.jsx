import { useProfesionales } from "../hooks/useProfesionales";
import { useTurnos } from "../contexto/TurnosContext";
import { Link } from "react-router-dom";

import FormularioProfesional from "../componentes/profesionales/FormularioProfesional";
import ListadoProfesionales from "../componentes/profesionales/ListadoProfesionales";
import FormularioTurno from "../componentes/turnos/FormularioTurno";

export default function Inicio() {
  // ✅ hooks SIEMPRE dentro del componente
  const { profesionales, agregarProfesional, eliminarProfesional } =
    useProfesionales();

  const { agregarTurno } = useTurnos();

  return (
    <div className="container">
      <h2>Consultorio odontológico</h2>

      {/* link dentro del JSX */}
      <Link to="/mis-turnos">Ver mis turnos</Link>

      <FormularioProfesional agregarProfesional={agregarProfesional} />

      <ListadoProfesionales
        profesionales={profesionales}
        eliminarProfesional={eliminarProfesional}
      />

      <FormularioTurno
        profesionales={profesionales}
        agregarTurno={agregarTurno}
      />
    </div>
  );
}