import ListadoTurnos from "../componentes/turnos/ListadoTurnos";
import { useTurnos } from "../contexto/TurnosContext";

export default function MisTurnos() {
  const { turnos, cancelarTurno, eliminarTurno } = useTurnos();

  return (
    <div className="container">
      <h2>Mis turnos</h2>

      <ListadoTurnos
        turnos={turnos}
        cancelarTurno={cancelarTurno}
        eliminarTurno={eliminarTurno}
      />
    </div>
  );
}