import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexto/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { loginApi } = useAuth();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  async function iniciarSesion(e) {
    e.preventDefault();
    setError("");

    try {
      const user = await loginApi(email, pass);
      if (user?.rol === "admin") navigate("/admin");
      else navigate("/inicio");
    } catch (err) {
      setError(err.message || "Error");
    }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="label">
            Contraseña
            <input
              className="field"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button className="btn" type="submit">
            Entrar
          </button>
        </form>

        <button className="linkLike" type="button" onClick={() => navigate("/registro")}>
          ¿No tenés cuenta? Registrate
        </button>

        <button className="linkLike" type="button" onClick={() => navigate("/home")}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}