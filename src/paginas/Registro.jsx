import { useLocation } from "wouter";
import { useState } from "react";
import axios from "axios";

export default function Registro() {
  const [, setLocation] = useLocation();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const manejarCambioDeInput = (setter) => (e) => {
    const emojis = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD00-\uDDFF])/g;
    const value = e.target.value;
    if (emojis.test(value)) {
        alert("No se permiten emojis en los campos de texto.");
        return;
    }
    setter(value);
  };

  async function registrar(e) {
    e.preventDefault();
    setError("");
    setOk("");

    try {
      await axios.post("http://localhost:3000/api/usuarios", { 
        nombre, 
        email, 
        pass,
        rol: "user"
      });
      
      setOk("✅ ¡Usuario creado con éxito! Redirigiendo...");
      setTimeout(() => setLocation("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error al intentar registrarse");
    }
  }

  return (
    <div className="login-clinica-container" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        background: "linear-gradient(135deg, #14857c 0%, #0b4d48 100%) !important",
        padding: "20px",
        boxSizing: "border-box",
        zIndex: 99999
    }}>
        <style>{`
            body, .auth, #root {
                background: linear-gradient(135deg, #14857c 0%, #0b4d48 100%) !important;
                margin: 0 !important;
                padding: 0 !important;
                height: 100vh !important;
                width: 100vw !important;
            }
            .header, header {
                display: none !important;
            }
        `}</style>

        <div className="tarjeta-presentacion-odontologica" style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            boxShadow: "0px 15px 40px rgba(5, 36, 34, 0.4)",
            overflow: "hidden",
            maxWidth: "900px",
            width: "100%",
            minHeight: "550px"
        }}>
            
            {/* Columna Izquierda Informativa */}
            <div className="columna-info-centro" style={{
                flex: 1,
                backgroundColor: "rgba(20, 133, 124, 0.05)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px",
                textAlign: "center",
                borderRight: "1px solid #e3efee"
            }}>
                <img 
                    src="/sonrisa.jpg" 
                    alt="Centro Odontológico Sonrisa Austral" 
                    style={{
                        width: "100%",
                        maxWidth: "240px",
                        height: "auto",
                        borderRadius: "16px",
                        objectFit: "cover",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 15px rgba(0,0,0,0.1)"
                    }}
                />
                <h3 style={{ margin: "0 0 10px 0", color: "#0b4d48", fontSize: "26px", fontWeight: "bold" }}>
                    Unite a Nosotros
                </h3>
                <p style={{ margin: 0, color: "#466b68", fontSize: "14px", lineHeight: "1.5", maxWidth: "280px" }}>
                    Registrate en segundos para acceder a la reserva de turnos online y el seguimiento de tu historial dental.
                </p>
            </div>

            {/* Columna Derecha - Formulario Estilizado */}
            <div className="columna-formulario-acceso" style={{
                flex: 1,
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }}>
                <h2 style={{ marginTop: 0, marginBottom: "25px", color: "#222", fontSize: "24px", fontWeight: "bold" }}>
                    Crear una cuenta
                </h2>
                
                <form onSubmit={registrar}>
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#444" }}>Nombre Completo</label>
                        <input
                            type="text"
                            placeholder="Tu nombre y apellido"
                            value={nombre}
                            onChange={manejarCambioDeInput(setNombre)}
                            required
                            style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ccc", boxSizing: "border-box" }}
                        />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#444" }}>Email</label>
                        <input
                            type="email"
                            placeholder="ejemplo@mail.com"
                            value={email}
                            onChange={manejarCambioDeInput(setEmail)}
                            required
                            style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ccc", boxSizing: "border-box" }}
                        />
                    </div>
                    
                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#444" }}>Contraseña</label>
                        <input
                            type="password"
                            placeholder="Mínimo 6 caracteres"
                            value={pass}
                            onChange={manejarCambioDeInput(setPass)}
                            required
                            style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ccc", boxSizing: "border-box" }}
                        />
                    </div>

                    {error && <p style={{ color: 'red', textAlign: 'center', margin: '10px 0', fontWeight: 'bold' }}>{error}</p>}
                    {ok && <p style={{ color: 'green', textAlign: 'center', margin: '10px 0', fontWeight: 'bold' }}>{ok}</p>}

                    <button 
                        type="submit" 
                        style={{ 
                            width: "100%", 
                            padding: "12px", 
                            borderRadius: "8px", 
                            fontWeight: "bold", 
                            cursor: "pointer",
                            backgroundColor: "#14857c",
                            color: "#fff",
                            border: "none",
                            fontSize: "16px",
                            boxShadow: "0px 4px 10px rgba(20, 133, 124, 0.3)"
                        }}
                    >
                        Registrarse
                    </button>
                </form>

                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <button onClick={() => setLocation("/login")} style={{ background: "none", border: "none", color: "#0b4d48", cursor: "pointer", textDecoration: "underline", fontSize: "14px" }}>
                        ¿Ya tenés cuenta? Iniciá sesión
                    </button>
                </div>
            </div>

        </div>
    </div>
  );
}