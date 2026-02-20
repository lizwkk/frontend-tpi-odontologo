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
    <div>
      <h2>Iniciar sesión</h2>

      <form onSubmit={iniciarSesion}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Entrar</button>
      </form>

      <p onClick={() => navigate("/registro")} style={{ cursor: "pointer" }}>
        ¿No tenés cuenta? Registrate
      </p>
    </div>
  );
}