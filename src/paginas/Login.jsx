import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function iniciarSesion(e) {
    e.preventDefault();
    // después conectamos backend
    navigate("/inicio");
  }

  return (
    <div className="auth">
      <div className="auth-card">
        <h2 className="auth-title">Iniciar sesión</h2>

        <form className="auth-form" onSubmit={iniciarSesion}>
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          <button className="btn" type="submit">
            Entrar
          </button>
        </form>

        <button
          className="linkLike"
          type="button"
          onClick={() => navigate("/registro")}
        >
          ¿No tenés cuenta? Registrate
        </button>

        <button className="linkLike" type="button" onClick={() => navigate("/home")}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}