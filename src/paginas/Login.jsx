import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexto/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function iniciarSesion(e) {
    e.preventDefault();
    setError("");

    try {
      const resp = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pass: password }),
      });

      if (!resp.ok) {
        const msg = await resp.text();
        setError(msg || "Error al iniciar sesión");
        return;
      }

      const data = await resp.json(); // { ok, token, user }
      login({ token: data.token, user: data.user });

      // si es admin lo mando a /admin, si no a /inicio
      if (data.user?.rol === "admin") navigate("/admin");
      else navigate("/inicio");
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el backend");
    }
  }

  return (
    <div className="auth">
      <div className="auth-card">
        <h2 className="auth-title">Iniciar sesión</h2>

        {error && <p style={{ color: "crimson", marginBottom: 10 }}>{error}</p>}

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