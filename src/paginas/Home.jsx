import { Link } from "react-router-dom";

function ToothIcon() {
  return (
    <svg className="logo" viewBox="0 0 100 100" aria-hidden="true">
      <path
        d="M20 10c-7 0-12 6-12 14 0 6 3 10 6 14 2 3 4 6 4 12 0 8 3 14 7 14 3 0 4-4 5-9 1-5 2-10 6-10s5 5 6 10c1 5 2 9 5 9 4 0 7-6 7-14 0-6 2-9 4-12 3-4 6-8 6-14 0-8-5-14-12-14-4 0-7 2-10 4-2 1-4 2-6 2s-4-1-6-2c-3-2-6-4-10-4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Home() {
  const nombreConsultorio = "Sonrisa Austral";

  return (
    <div className="page">
      <header className="header">
        <div className="brand">
          <ToothIcon />
          <div className="brand-text">
            <div className="brand-name">{nombreConsultorio}</div>
            <div className="brand-sub">Consultorio odontológico • Gestión de turnos</div>
          </div>
        </div>

        <nav className="nav">
          <Link className="nav-link" to="/login">
            Iniciar sesión
          </Link>
          <Link className="nav-btn" to="/registro">
            Registrarse
          </Link>
        </nav>
      </header>

      <main className="main">
        <section className="hero hero--split">
          <div className="hero-left">
            <h1 className="hero-title">Tu sonrisa, nuestra prioridad</h1>

            <p className="hero-text">
              Atención cálida y profesional. Reservá tu turno en segundos y tené tus
              reservas siempre a mano.
            </p>

            <ul className="bullets">
              <li>✅ Turnos rápidos y ordenados</li>
              <li>✅ Recordatorios y notas (cuando conectemos backend)</li>
              <li>✅ Administración para el consultorio</li>
            </ul>

            <div className="hero-actions">
              <Link className="btn" to="/login">
                Reservar turno
              </Link>
              <Link className="btn ghost" to="/inicio">
                Ir al sistema
              </Link>
            </div>
          </div>

          <div className="hero-right">
            <div className="image-card">
              <img
                className="hero-img"
                src="/sonrisa.jpg"
                alt="Sonrisa saludable"
                loading="lazy"
              />
              <div className="image-caption">Odontología general • Estética • Prevención</div>
            </div>
          </div>
        </section>

        <section className="features">
          <h2 className="section-title">Funciones principales</h2>

          <div className="grid">
            <article className="card">
              <h3 className="card-title">Reservar turno</h3>
              <p className="card-text">
                Elegí profesional, fecha y hora. Sumá una nota si necesitás.
              </p>
              <Link className="btn small" to="/inicio">
                Reservar
              </Link>
            </article>

            <article className="card">
              <h3 className="card-title">Ver mis turnos</h3>
              <p className="card-text">
                Consultá tus reservas, cancelá o eliminá turnos.
              </p>
              <Link className="btn small" to="/mis-turnos">
                Ver turnos
              </Link>
            </article>

            <article className="card">
              <h3 className="card-title">Administración</h3>
              <p className="card-text">
                Uso interno del consultorio (profesionales/turnos). Luego lo
                conectamos al backend y lo restringimos por rol.
              </p>
              <Link className="btn small" to="/admin">
                Ir a admin
              </Link>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-title">{nombreConsultorio}</div>
            <div className="footer-text">Atención personalizada y prevención.</div>
          </div>

          <div>
            <div className="footer-title">Horarios</div>
            <div className="footer-text">Lun a Vie: 9:00–18:00</div>
            <div className="footer-text">Sáb: 9:00–13:00</div>
          </div>

          <div>
            <div className="footer-title">Ubicación</div>
            <div className="footer-text">Ushuaia, Tierra del Fuego</div>
            <div className="footer-text">Turnos con reserva previa</div>
          </div>

          <div>
            <div className="footer-title">Contacto</div>
            <div className="footer-text">WhatsApp: +54 9 2901 000-000</div>
            <div className="footer-text">Email: contacto@sonrisaaustral.com</div>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} {nombreConsultorio}
        </div>
      </footer>
    </div>
  );
}