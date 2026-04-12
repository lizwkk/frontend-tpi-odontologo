import axios from "axios";

export default function TurnosAdmin({ turnos, onActualizar, token }) {
  const eliminarTurno = async (id) => {
    if (!window.confirm("¿Seguro que querés cancelar este turno?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/turnos/${id}`, {
        headers: { Authorization: token }
      });
      onActualizar(); 
    } catch (error) {
      alert("Error al eliminar el turno");
    }
  };

  return (
    <div className="panel">
      <h3>Gestión de Turnos (Admin)</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Profesional</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {turnos.map((t) => (
            <tr key={t.id}>
              <td>{t.paciente_nombre}</td>
              <td>{t.profesional_nombre}</td>
              <td>{t.fecha}</td>
              <td>
                <button onClick={() => eliminarTurno(t.id)} className="logout-button">
                  Cancelar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}