import { useState } from "react";
import axios from "axios";

export default function AgregarAdmin({ onActualizar }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const token = localStorage.getItem("token");

  const agregar = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/usuarios/registro",
        { nombre, email, pass, rol: "admin" },
        { headers: { Authorization: token } }
      );
      
      alert("Administrador agregado con éxito");
      setNombre("");
      setEmail("");
      setPass("");
      onActualizar(); 
    } catch (error) {
      console.error(error);
      alert("Error al agregar");
    }
  };

  return (
    <div className="panel" style={{ marginBottom: "20px" }}>
      <h3>Agregar Nuevo Administrador</h3>
      <form onSubmit={agregar} className="auth-form">
        <input 
          className="field" 
          placeholder="Nombre Completo" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          required 
        />
        <input 
          className="field" 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          className="field" 
          type="password" 
          placeholder="Contraseña" 
          value={pass} 
          onChange={(e) => setPass(e.target.value)} 
          required 
        />
        <button className="btn" type="submit">Guardar Admin</button>
      </form>
    </div>
  );
}