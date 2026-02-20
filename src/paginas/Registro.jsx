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
    navigate("/");
  }

  return (
    <div>
      <h2>Registro</h2>

      <form onSubmit={registrar}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

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

        <button>Crear cuenta</button>
      </form>

      <p onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        Volver al login
      </p>
    </div>
  );
}