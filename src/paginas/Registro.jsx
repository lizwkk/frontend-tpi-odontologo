import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Registro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function registrar(e) {
    e.preventDefault();
    // después conectamos backend
    navigate("/login");
  }

  return (
    <div className="auth">
      <div className="auth-card">
        <h2 className="auth-title">Registro</h2>

        <form className="auth-form" onSubmit={registrar}>
          <label className="label">
            Nombre
            <input
              className="field"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              autoComplete="name"
              required
            />
          </label>

          <label className="label">
            Email
            <input
              className="field"
              type="email"
              placeholder="tuemail@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label className="label">
            Contraseña
            <input
              className="field"
              type="password"
              placeholder="Creá una contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </label>

          <button className="btn" type="submit">
            Crear cuenta
          </button>
        </form>

        <button className="linkLike" type="button" onClick={() => navigate("/login")}>
          Volver al login
        </button>

        <button className="linkLike" type="button" onClick={() => navigate("/home")}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}