import { Link } from "react-router-dom";
import { useProfesionales } from "../hooks/useProfesionales";
import { useTurnos } from "../contexto/TurnosContext";

import FormularioProfesional from "../componentes/profesionales/FormularioProfesional";
import ListadoProfesionales from "../componentes/profesionales/ListadoProfesionales";
import FormularioTurno from "../componentes/turnos/FormularioTurno";

export default function Inicio() {
  const { profesionales, agregarProfesional, eliminarProfesional } =
    useProfesionales();

  const { agregarTurno } = useTurnos();

  return (
    <div className="shell">
      {/* Header interno */}
      <div className="shell-top">
        <h2 className="shell-title">Consultorio odontológico</h2>
        <Link className="shell-link" to="/mis-turnos">
          Ver mis turnos
        </Link>
      </div>

      {/* Nuevo profesional */}
      <div className="panel" style={{ marginBottom: 14 }}>
        <FormularioProfesional agregarProfesional={agregarProfesional} />
      </div>

      {/* Listado de profesionales */}
      <div className="panel" style={{ marginBottom: 14 }}>
        <ListadoProfesionales
          profesionales={profesionales}
          eliminarProfesional={eliminarProfesional}
        />
      </div>

      {/* Sacar turno */}
      <div className="panel">
        <FormularioTurno
          profesionales={profesionales}
          agregarTurno={agregarTurno}
        />
      </div>
    </div>
  );
}