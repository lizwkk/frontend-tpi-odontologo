import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <div className="home-card">
        <div className="logo">🦷</div>
        <h1>Consultorio Odontológico</h1>
        <p>
          Sistema de gestión de turnos para pacientes y profesionales.
        </p>

        <div className="home-actions">
          <Link to="/login">Iniciar sesión</Link>
          <Link to="/registro">Registrarse</Link>
        </div>
      </div>
    </div>
  );
}