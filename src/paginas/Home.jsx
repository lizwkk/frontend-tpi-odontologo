import { Link } from "wouter";

export default function Home() {
  return (
    <div className="auth">
      <div className="auth-card" style={{ textAlign: "center" }}>
        <h1 className="auth-title">Bienvenido al Consultorio</h1>
        <p className="muted">Tu sonrisa, nuestra prioridad.</p>
        
        <div style={{ display: "grid", gap: "10px", marginTop: "20px" }}>
          <Link href="/login">
            <button className="btn">Iniciar Sesión</button>
          </Link>
          
          <Link href="/registro">
            <button className="btn" style={{ backgroundColor: "#eee", color: "#333" }}>
              Crear una cuenta
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
