import { useState } from "react";
import axios from "axios";

export default function AgregarAdmin({ onActualizar }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const token = localStorage.getItem("token");

  // Estado para manejar los mensajes flotantes integrados
  const [notificacion, setNotificacion] = useState({ mostrar: false, mensaje: "", tipo: "" });

  const mostrarMensaje = (mensaje, tipo) => {
    setNotificacion({ mostrar: true, mensaje, tipo });
    // Se cierra solo automáticamente después de 3 segundos
    setTimeout(() => {
      setNotificacion({ mostrar: false, mensaje: "", tipo: "" });
    }, 3000);
  };

  const agregar = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/usuarios/nuevoAdmin", 
        { nombre, email, pass }, 
        { headers: { Authorization: token } }
      );
      
      // 🌟 Chau emoji de Facebook, ahora es un texto limpio y profesional
      mostrarMensaje("Administrador registrado con éxito", "exito");
      setNombre("");
      setEmail("");
      setPass("");
      onActualizar(); 
    } catch (error) {
      console.error(error);
      mostrarMensaje("Error al procesar el registro del administrador", "error");
    }
  };

  return (
    <div className="panel" style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: "20px" }}>
      <h3 style={{ color: '#0b4d48', margin: '0 0 15px 0', fontSize: '20px', fontWeight: 'bold' }}>Agregar Nuevo Administrador</h3>
      
      <form onSubmit={agregar} className="auth-form" style={{ display: 'grid', gap: '12px' }}>
        <input 
          className="field" 
          placeholder="Nombre Completo" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          required 
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        />
        <input 
          className="field" 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        />
        <input 
          className="field" 
          type="password" 
          placeholder="Contraseña" 
          value={pass} 
          onChange={(e) => setPass(e.target.value)} 
          required 
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        />
        <button 
          className="btn" 
          type="submit"
          style={{ width: '100%', padding: '12px', backgroundColor: '#14857c', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}
        >
          Guardar Admin
        </button>
      </form>

    
      {notificacion.mostrar && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: notificacion.tipo === 'exito' ? '#e8f5e9' : '#ffebee', // Verdes y rojos pastel muy sutiles médicos
          color: notificacion.tipo === 'exito' ? '#1b5e20' : '#b71c1c',
          border: `1px solid ${notificacion.tipo === 'exito' ? '#c8e6c9' : '#ffcdd2'}`,
          padding: '15px 25px',
          borderRadius: '8px',
          boxShadow: '0 6px 15px rgba(0,0,0,0.08)',
          fontWeight: '500',
          fontSize: '14px',
          zIndex: 200000,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontFamily: 'sans-serif'
        }}>
          <span>{notificacion.mensaje}</span>
          <button 
            onClick={() => setNotificacion({ mostrar: false, mensaje: "", tipo: "" })}
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', marginLeft: '5px', padding: 0 }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}