import axios from "axios";

export default function TurnosAdmin({ turnos, onActualizar, token }) {
  
  const eliminarTurno = async (id) => {
    if (!window.confirm("¿Seguro que querés cancelar este turno de forma definitiva?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/turnos/${id}`, {
        headers: { Authorization: token }
      });
      onActualizar(); 
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el turno. Revisá los permisos de admin.");
    }
  };

  return (
    <div className="panel">
      <h3>Gestión de Turnos (Admin)</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>
            <th style={{ padding: '12px' }}>Paciente</th>
            <th style={{ padding: '12px' }}>Profesional</th>
            <th style={{ padding: '12px' }}>Fecha</th>
            <th style={{ padding: '12px' }}>Hora</th>
            <th style={{ padding: '12px' }}>Estado</th>
            <th style={{ padding: '12px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {turnos.length === 0 ? (
            <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No hay turnos registrados en el sistema.</td></tr>
          ) : (
            turnos.map((t) => (
              <tr key={t.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>
                  {/* Si el JOIN trae el nombre, lo usamos; si no, mostramos el ID de usuario */}
                  <b>{t.paciente_nombre || `Usuario #${t.usuario_id}`}</b>
                </td>
                <td style={{ padding: '12px' }}>{t.profesional_nombre || "Médico General"}</td>
                <td style={{ padding: '12px' }}>
                  {t.fecha && t.fecha !== "0000-00-00" ? new Date(t.fecha).toLocaleDateString() : "Sin fecha"}
                </td>
                <td style={{ padding: '12px' }}>
                  {t.hora ? t.hora.substring(0, 5) : "--:--"} hs
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{ 
                    fontSize: '0.85em', 
                    padding: '3px 8px', 
                    borderRadius: '12px',
                    backgroundColor: t.estado === 'activo' ? '#d4edda' : '#fff3cd',
                    color: t.estado === 'activo' ? '#155724' : '#856404'
                  }}>
                    {t.estado || "pendiente"}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <button 
                    onClick={() => eliminarTurno(t.id)} 
                    className="logout-button"
                    style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}