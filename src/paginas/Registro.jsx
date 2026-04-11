import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexto/AuthContext.jsx";

export default function Registro() {
  const navigate = useNavigate();
  const { registerApi } = useAuth();

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
      await registerApi(nombre, email, pass);
      setOk("Usuario creado. Ahora iniciá sesión.");
      setTimeout(() => navigate("/login"), 600);
    } catch (err) {
      setError(err.message || "Error");
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
          {ok && <p className="auth-ok">{ok}</p>}

          <button className="btn" type="submit">
            Crear cuenta
          </button>
        </form>

        <button className="linkLike" type="button" onClick={() => navigate("/login")}>
          Volver al login
        </button>
      </div>
    </div>
  );
}