import { useState } from "react";
import axios from "axios";

export default function TurnosAdmin({ turnos, onActualizar, token }) {
  
  const [modalEliminar, setModalEliminar] = useState({ abierto: false, id: null, paciente: "" });
  const [modalEstado, setModalEstado] = useState({ abierto: false, id: null, estadoActual: "", nuevoEstado: "" });

  const abrirConfirmarEliminar = (id, paciente) => {
    setModalEliminar({ abierto: true, id, paciente });
  };

  const ejecutarEliminar = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/turnos/${modalEliminar.id}`, {
        headers: { Authorization: token }
      });
      setModalEliminar({ abierto: false, id: null, paciente: "" });
      onActualizar(); 
    } catch (error) {
      console.error(error);
      alert("No se pudo cancelar el turno.");
    }
  };

  const abrirEditarEstado = (id, estadoActual) => {
    setModalEstado({ abierto: true, id, estadoActual, nuevoEstado: estadoActual || "pendiente" });
  };

  const ejecutarCambioEstado = async () => {
    try {
      await axios.put(`http://localhost:3000/api/turnos/${modalEstado.id}`, 
        { nuevoEstado: modalEstado.nuevoEstado }, 
        { headers: { Authorization: token } }
      );
      setModalEstado({ abierto: false, id: null, estadoActual: "", nuevoEstado: "" });
      onActualizar();
    } catch (error) {
      console.error(error);
      alert("Error al actualizar el estado. Asegurate que el servidor acepte este estado.");
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#fff", borderRadius: "10px" }}>
      <h2 style={{ color: "#0b4d48" }}>Gestión de Turnos</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f7f6", textAlign: "left" }}>
            <th style={{ padding: "12px" }}>Paciente</th>
            <th style={{ padding: "12px" }}>Fecha/Hora</th>
            <th style={{ padding: "12px" }}>Estado</th>
            <th style={{ padding: "12px" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {turnos.map((t) => (
            <tr key={t.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "12px" }}>{t.paciente_nombre}</td>
              <td style={{ padding: "12px" }}>{new Date(t.fecha).toLocaleDateString()} - {t.hora}</td>
              <td style={{ padding: "12px", fontWeight: "bold", color: "#0b4d48" }}>{t.estado}</td>
              <td style={{ padding: "12px" }}>
                <button onClick={() => abrirEditarEstado(t.id, t.estado)} style={{ marginRight: "10px", padding: "5px 10px", cursor: "pointer" }}>Editar</button>
                <button onClick={() => abrirConfirmarEliminar(t.id, t.paciente_nombre)} style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none", cursor: "pointer" }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL EDITAR ESTADO */}
      {modalEstado.abierto && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "white", padding: "25px", borderRadius: "10px", width: "300px" }}>
            <h3>Actualizar Estado</h3>
           <select 
          value={modalEstado.nuevoEstado} 
          onChange={(e) => setModalEstado({ ...modalEstado, nuevoEstado: e.target.value })}
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '25px', fontSize: '15px' }}
>
         <option value="activo">Activo</option>
         <option value="cancelado">Cancelado</option>
         <option value="completado">Completado</option>
         </select>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button onClick={() => setModalEstado({ abierto: false, id: null, estadoActual: "", nuevoEstado: "" })}>Cancelar</button>
              <button onClick={ejecutarCambioEstado} style={{ backgroundColor: "#14857c", color: "white", border: "none", padding: "5px 10px" }}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}