import { useLocation } from "wouter";
import { useState } from "react";
import axios from "axios";

export default function Registro() {
  const [, setLocation] = useLocation();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  async function registrar(e) {
    e.preventDefault();
    setError("");
    setOk("");

    try {
      // CORRECCIÓN AQUÍ: Quitamos "/registro" de la URL
      await axios.post("http://localhost:3000/api/usuarios", { 
        nombre, 
        email, 
        pass,
        rol: "paciente"
      });
      
      setOk("✅ ¡Usuario creado con éxito! Redirigiendo...");
      setTimeout(() => setLocation("/login"), 2000);
    } catch (err) {
      console.error(err);
      // Si el backend te manda un error específico, lo mostramos
      setError(err.response?.data?.message || "Error al intentar registrarse");
    }
  }

  return (
    <div className="auth">
      <div className="auth-card">
        <h2 className="auth-title">Registro</h2>

        <form className="auth-form" onSubmit={registrar}>
          <label className="label">
            Nombre
            <input className="field" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </label>

          <label className="label">
            Email
            <input className="field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>

          <label className="label">
            Contraseña
            <input className="field" type="password" value={pass} onChange={(e) => setPass(e.target.value)} required />
          </label>

          {error && <p className="auth-error">{error}</p>}
          {ok && <p className="auth-ok" style={{color: 'green', fontWeight: 'bold'}}>{ok}</p>}

          <button className="btn" type="submit">
            Crear cuenta
          </button>
        </form>

        <button className="linkLike" type="button" onClick={() => setLocation("/login")}>
          ¿Ya tenés cuenta? Volver al login
        </button>
      </div>
    </div>
  );
}