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
      // CORRECCIÓN: La ruta correcta según tu main.js es /api/login
      const resp = await axios.post("http://localhost:3000/api/login", { email, pass });

      if (resp.data.status === "ok") {
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("rol", resp.data.rol);
        localStorage.setItem("nombre", resp.data.nombre);

        // Avisamos a App.jsx que ya estamos dentro
        onLogin(resp.data.token, resp.data.rol);

        // Redirigimos según el rol que viene de la base de datos
        if (resp.data.rol === "admin") {
          setLocation("/admin");
        } else {
          setLocation("/inicio");
        }
      }
    } catch (err) {
      console.error(err);
      // Si el servidor tiró un 401 (Unauthorized), es por datos mal puestos
      if (err.response?.status === 401) {
        setError("Usuario o contraseña incorrectos");
      } else {
        setError("Error de conexión con el servidor");
      }
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

          {error && <p className="auth-error" style={{color: 'red', textAlign: 'center'}}>{error}</p>}

          <button className="btn" type="submit">
            Entrar
          </button>
        </form>

        <button className="linkLike" type="button" onClick={() => setLocation("/registro")}>
          ¿No tenés cuenta? Registrate
        </button>

        <button className="linkLike" type="button" onClick={() => setLocation("/")}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}