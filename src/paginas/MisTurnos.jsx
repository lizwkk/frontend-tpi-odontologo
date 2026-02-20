import ListadoTurnos from "../componentes/turnos/ListadoTurnos";

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