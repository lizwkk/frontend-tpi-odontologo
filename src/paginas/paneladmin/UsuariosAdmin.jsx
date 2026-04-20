import axios from "axios";

export default function UsuariosAdmin({ usuarios, onActualizar }) {
  const token = localStorage.getItem("token");

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
    
    try {
      await axios.delete(`http://localhost:3000/api/usuarios/${id}`, {
        headers: { Authorization: token }
      });
      onActualizar(); 
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el usuario");
    }
  };

  return (
    <div className="panel">
      <h3>Control de Usuarios</h3>
      <div className="grid-list">
        {usuarios.length === 0 ? (
          <p>No hay usuarios registrados.</p>
        ) : (
          usuarios.map((u) => (
            <div key={u.id} className="itemRow">
              <div>
                <b>{u.nombre}</b> <span className="muted">({u.rol})</span>
                <br />
                <small>{u.email}</small>
              </div>
              <button 
                className="btn-delete" 
                onClick={() => eliminarUsuario(u.id)}
                style={{ backgroundColor: '#c20b0b', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}