import { useState } from "react";
import axios from "axios";
import { useLocation } from "wouter";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const resp = await axios.post("http://localhost:5000/api/usuarios/login", { email, pass });

      if (resp.data.status === "ok") {
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("rol", resp.data.rol);
        localStorage.setItem("nombre", resp.data.nombre);

        onLogin(resp.data.token, resp.data.rol);

        // Redirigimos según el rol
        if (resp.data.rol === "admin") {
          setLocation("/admin");
        } else {
          setLocation("/inicio");
        }
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    }
  };

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

        <button className="linkLike" type="button" onClick={() => setLocation("/registro")}>
          ¿No tenés cuenta? Registrate
        </button>

        <button className="linkLike" type="button" onClick={() => setLocation("/home")}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}