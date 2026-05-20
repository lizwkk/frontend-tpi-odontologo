import { useState } from "react";
import axios from "axios";

export default function UsuariosAdmin({ usuarios, onActualizar }) {
  const token = localStorage.getItem("token");

  // Estados para controlar los Modals personalizados
  const [modalEliminar, setModalEliminar] = useState({ abierto: false, id: null, nombre: "" });
  const [modalRol, setModalRol] = useState({ abierto: false, id: null, nombre: "", rolActual: "", nuevoRol: "" });

  const abrirConfirmarEliminar = (id, nombre) => {
    setModalEliminar({ abierto: true, id, nombre });
  };

  const ejecutarEliminar = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/usuarios/${modalEliminar.id}`, {
        headers: { Authorization: token }
      });
      setModalEliminar({ abierto: false, id: null, nombre: "" });
      onActualizar(); 
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el usuario");
    }
  };

  const abrirEditarRol = (id, nombre, rolActual) => {
    setModalRol({ abierto: true, id, nombre, rolActual, nuevoRol: rolActual });
  };

  const ejecutarCambioRol = async () => {
    if (modalRol.nuevoRol !== "admin" && modalRol.nuevoRol !== "user") {
      alert("Rol inválido");
      return;
    }
    try {
      await axios.put(`http://localhost:3000/api/usuarios/${modalRol.id}`, 
        { nuevoRol: modalRol.nuevoRol }, 
        { headers: { Authorization: token } }
      );
      setModalRol({ abierto: false, id: null, nombre: "", rolActual: "", nuevoRol: "" });
      onActualizar();
    } catch (error) {
      console.error(error);
      alert("Error al actualizar el rol");
    }
  };

  return (
    <div className="panel" style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginTop: '20px' }}>
      <h3 style={{ color: '#0b4d48', margin: '0 0 15px 0', fontSize: '20px', fontWeight: 'bold' }}>Control de Usuarios</h3>
      <div className="grid-list">
        {usuarios.length === 0 ? (
          <p style={{ color: '#666', textAlign: 'center' }}>No hay usuarios registrados.</p>
        ) : (
          usuarios.map((u) => (
            <div key={u.id} className="itemRow" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eef5f4' }}>
              <div>
                <b style={{ color: '#222', fontSize: '16px' }}>{u.nombre}</b> 
                <span style={{ marginLeft: '8px', padding: '2px 8px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', backgroundColor: u.rol === 'admin' ? '#e3f2fd' : '#f0f0f0', color: u.rol === 'admin' ? '#0d47a1' : '#555' }}>
                  {u.rol}
                </span>
                <br />
                <small style={{ color: '#666' }}>{u.email}</small>
              </div>
              <div>
                <button 
                  onClick={() => abrirEditarRol(u.id, u.nombre, u.rol)}
                  style={{ marginRight: '10px', backgroundColor: '#14857c', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 14px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                   Asignar Rol
                </button>
                <button 
                  onClick={() => abrirConfirmarEliminar(u.id, u.nombre)}
                  style={{ backgroundColor: '#c20b0b', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 14px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🧾 MODAL FLOTANTE: CONFIRMAR ELIMINACIÓN */}
      {modalEliminar.abierto && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100000 }}>
          <div style={{ backgroundColor: '#white', padding: '30px', borderRadius: '15px', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#c20b0b', fontSize: '20px' }}>⚠️ ¿Confirmar Baja?</h4>
            <p style={{ color: '#444', marginBottom: '25px' }}>Estás a punto de eliminar permanentemente al usuario <b>{modalEliminar.nombre}</b>. Esta acción no se puede deshacer.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <button onClick={() => setModalEliminar({ abierto: false, id: null, nombre: "" })} style={{ padding: '10px 20px', border: '1px solid #ccc', borderRadius: '8px', background: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>Cancelar</button>
              <button onClick={ejecutarEliminar} style={{ padding: '10px 20px', border: 'none', borderRadius: '8px', background: '#c20b0b', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>Eliminar Definitivamente</button>
            </div>
          </div>
        </div>
      )}

      {/* 🎭 MODAL FLOTANTE: EDITAR ROL */}
      {modalRol.abierto && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100000 }}>
          <div style={{ backgroundColor: '#white', padding: '30px', borderRadius: '15px', maxWidth: '400px', width: '90%', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#0b4d48', fontSize: '20px', textAlign: 'center' }}>⚙️ Modificar Permisos</h4>
            <p style={{ color: '#444', fontSize: '14px', marginBottom: '15px' }}>Seleccioná el nuevo rol en el sistema para <b>{modalRol.nombre}</b>:</p>
            
            <select 
              value={modalRol.nuevoRol} 
              onChange={(e) => setModalRol({ ...modalRol, nuevoRol: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '25px', fontSize: '15px' }}
            >
              <option value="user">Usuario / Paciente (user)</option>
              <option value="admin">Administrador (admin)</option>
            </select>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setModalRol({ abierto: false, id: null, nombre: "", rolActual: "", nuevoRol: "" })} style={{ padding: '10px 15px', border: '1px solid #ccc', borderRadius: '8px', background: '#fff', cursor: 'pointer' }}>Cancelar</button>
              <button onClick={ejecutarCambioRol} style={{ padding: '10px 20px', border: 'none', borderRadius: '8px', background: '#14857c', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>Guardar Cambios</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}