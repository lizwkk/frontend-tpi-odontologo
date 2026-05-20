import { useState } from "react";
import axios from "axios";

export default function ProfesionalesAdmin({ profesionales, onActualizar, token }) {
  const [nombre, setNombre] = useState("");
  const [especialidad, setEspecialidad] = useState("");

  // Estados para Modales Flotantes Estéticos (Chau prompt y confirm viejos)
  const [modalEliminar, setModalEliminar] = useState({ abierto: false, id: null, nombre: "" });
  const [modalEditar, setModalEditar] = useState({ abierto: false, id: null, nombre: "", especialidad: "" });
  const [notificacion, setNotificacion] = useState({ mostrar: false, mensaje: "", tipo: "" });

  const mostrarMensaje = (mensaje, tipo) => {
    setNotificacion({ mostrar: true, mensaje, tipo });
    setTimeout(() => setNotificacion({ mostrar: false, mensaje: "", tipo: "" }), 3000);
  };

  // C - CREAR: Agregar nuevo profesional
  const agregarProfesional = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/profesionales", 
        { nombre, especialidad }, 
        { headers: { Authorization: token } }
      );
      mostrarMensaje("Profesional registrado con éxito", "exito");
      setNombre("");
      setEspecialidad("");
      onActualizar();
    } catch (error) {
      console.error(error);
      mostrarMensaje("Error al registrar el profesional", "error");
    }
  };

  // U - UPDATE: Abrir modal y guardar edición
  const abrirEditar = (p) => {
    setModalEditar({ abierto: true, id: p.id, nombre: p.nombre, especialidad: p.especialidad });
  };

  const guardarEdicion = async () => {
    try {
      await axios.put(`http://localhost:3000/api/profesionales/${modalEditar.id}`, 
        { 
          nombre: modalEditar.nombre, 
          especialidad: modalEditar.especialidad 
        },
        { headers: { Authorization: token } }
      );
      setModalEditar({ abierto: false, id: null, nombre: "", especialidad: "" });
      mostrarMensaje("Datos actualizados correctamente", "exito");
      onActualizar();
    } catch (error) {
      console.error(error);
      mostrarMensaje("Error al actualizar datos", "error");
    }
  };

  // D - DELETE: Abrir modal de confirmación y borrar
  const abrirConfirmarEliminar = (id, nombre) => {
    setModalEliminar({ abierto: true, id, nombre });
  };

  const ejecutarEliminar = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/profesionales/${modalEliminar.id}`, {
        headers: { Authorization: token }
      });
      setModalEliminar({ abierto: false, id: null, nombre: "" });
      mostrarMensaje("Profesional dado de baja", "exito");
      onActualizar();
    } catch (error) {
      console.error(error);
      mostrarMensaje("No se pudo eliminar el registro", "error");
    }
  };

  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      
      {/* 🟢 FORMULARIO: NUEVO PROFESIONAL */}
      <div className="panel" style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <h3 style={{ color: '#0b4d48', margin: '0 0 15px 0', fontSize: '20px', fontWeight: 'bold' }}>Nuevo Profesional</h3>
        <form onSubmit={agregarProfesional} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input 
            className="field" 
            placeholder="Nombre" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            required 
            style={{ flex: 2, padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
          <input 
            className="field" 
            placeholder="Especialidad" 
            value={especialidad} 
            onChange={(e) => setEspecialidad(e.target.value)} 
            required 
            style={{ flex: 2, padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
          <button 
            type="submit"
            style={{ flex: 1, padding: '12px', backgroundColor: '#14857c', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Agregar
          </button>
        </form>
      </div>

      {/* 📋 TABLA: STAFF DE PROFESIONALES */}
      <div className="panel" style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <h3 style={{ color: '#0b4d48', margin: '0 0 15px 0', fontSize: '20px', fontWeight: 'bold' }}>Profesionales</h3>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(20, 133, 124, 0.08)', textAlign: 'left', borderBottom: '2px solid #14857c' }}>
              <th style={{ padding: '12px', color: '#0b4d48' }}>Profesional</th>
              <th style={{ padding: '12px', color: '#0b4d48' }}>Especialidad</th>
              <th style={{ padding: '12px', color: '#0b4d48', textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {!Array.isArray(profesionales) || profesionales.length === 0 ? (
              <tr><td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>No hay profesionales registrados.</td></tr>
            ) : (
              profesionales.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #eef5f4' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: '#222' }}>{p.nombre}</td>
                  <td style={{ padding: '12px', color: '#555' }}>{p.especialidad || "General"}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button 
                      onClick={() => abrirEditar(p)}
                      style={{ marginRight: '10px', backgroundColor: '#eef5f4', color: '#0b4d48', border: '1px solid #14857c', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                       Editar
                    </button>
                    <button 
                      onClick={() => abrirConfirmarEliminar(p.id, p.nombre)}
                      style={{ backgroundColor: '#ffebee', color: '#b71c1c', border: '1px solid #ffcdd2', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      ✕ Borrar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🎭 MODAL FLOTANTE: EDITAR PROFESIONAL */}
      {modalEditar.abierto && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100000 }}>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', maxWidth: '400px', width: '90%', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#0b4d48', fontSize: '20px', textAlign: 'center' }}>Modificar Profesional</h4>
            <div style={{ display: 'grid', gap: '12px', marginTop: '15px' }}>
              <label style={{ fontWeight: 'bold', color: '#444', fontSize: '14px' }}>Nombre Completo</label>
              <input 
                value={modalEditar.nombre} 
                onChange={(e) => setModalEditar({ ...modalEditar, nombre: e.target.value })}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
              <label style={{ fontWeight: 'bold', color: '#444', fontSize: '14px' }}>Especialidad</label>
              <input 
                value={modalEditar.especialidad} 
                onChange={(e) => setModalEditar({ ...modalEditar, especialidad: e.target.value })}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '25px' }}>
              <button onClick={() => setModalEditar({ abierto: false, id: null, nombre: "", especialidad: "" })} style={{ padding: '10px 15px', border: '1px solid #ccc', borderRadius: '8px', background: '#fff', cursor: 'pointer' }}>Cancelar</button>
              <button onClick={guardarEdicion} style={{ padding: '10px 20px', border: 'none', borderRadius: '8px', background: '#14857c', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>Guardar</button>
            </div>
          </div>
        </div>
      )}

      {/* ⚠️ MODAL FLOTANTE: CONFIRMAR ELIMINACIÓN */}
      {modalEliminar.abierto && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100000 }}>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#b71c1c', fontSize: '20px' }}>Eliminar Profesional</h4>
            <p style={{ color: '#444', marginBottom: '25px' }}>¿Seguro que querés dar de baja al <b>{modalEliminar.nombre}</b>? Esta acción modificará la disponibilidad en la cartilla médica.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <button onClick={() => setModalEliminar({ abierto: false, id: null, nombre: "" })} style={{ padding: '10px 20px', border: '1px solid #ccc', borderRadius: '8px', background: '#fff', cursor: 'pointer' }}>Cancelar</button>
              <button onClick={ejecutarEliminar} style={{ padding: '10px 20px', border: 'none', borderRadius: '8px', background: '#b71c1c', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>Confirmar Baja</button>
            </div>
          </div>
        </div>
      )}

      {/* 🌟 NOTIFICACIÓN INTEGRADA SOBRIA (Arriba a la derecha) */}
      {notificacion.mostrar && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px',
          backgroundColor: notificacion.tipo === 'exito' ? '#e8f5e9' : '#ffebee',
          color: notificacion.tipo === 'exito' ? '#1b5e20' : '#b71c1c',
          border: `1px solid ${notificacion.tipo === 'exito' ? '#c8e6c9' : '#ffcdd2'}`,
          padding: '15px 25px', borderRadius: '8px', boxShadow: '0 6px 15px rgba(0,0,0,0.08)',
          fontWeight: '500', fontSize: '14px', zIndex: 200000
        }}>
          <span>{notificacion.mensaje}</span>
        </div>
      )}

    </div>
  );
}