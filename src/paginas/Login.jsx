import { useState } from "react";
import axios from "axios";
import { useLocation } from "wouter";

export default function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const [, setLocation] = useLocation();

    const manejarCambioDeInput = (setter) => (e) => {
        const emojis = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD00-\uDDFF])/g;
        const value = e.target.value;
        if (emojis.test(value)) {
            alert("No se permiten emojis en los campos de texto.");
            return;
        }
        setter(value);
    };

    const iniciarSesion = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // Puerto 3000 y mandamos 'password' para que el backend lo reconozca
            const resp = await axios.post("http://localhost:3000/api/login", { 
                email, 
                pass 
            });
            console.log("Respuesta del servidor:", resp.data);
            if (resp.data.status === "ok") {
                // Guardamos todos los datos necesarios
                localStorage.setItem("token", resp.data.token);
                localStorage.setItem("rol", resp.data.rol);
                localStorage.setItem("nombre", resp.data.nombre);
                
                // IMPORTANTE: Guardamos el ID que viene de tu tabla (id)
                localStorage.setItem("id_usuario", resp.data.id); 
                
                // Actualizamos el estado global en App.jsx
                onLogin(resp.data.token, resp.data.rol);

                // Redirección según rol
                if (resp.data.rol === "admin") {
                    setLocation("/admin");
                } else {
                    setLocation("/inicio");
                }
            }
        } catch (err) {
            console.error("Error detallado:", err);
            if (!err.response) {
                setError("❌ El servidor no responde en el puerto 3000");
            } else {
                setError("❌ Usuario o contraseña incorrectos");
            }
        }
    };

    return (
        <div className="auth">
            <div className="auth-card">
                <h2 className="auth-title">Iniciar sesión</h2>
                <form className="auth-form" onSubmit={iniciarSesion}>
                    <div className="form-group">
                        <label className="label">Email</label>
                        <input
                            className="field"
                            type="email"
                            placeholder="isa@mail.com"
                            value={email}
                            onChange={manejarCambioDeInput(setEmail)}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="label">Contraseña</label>
                        <input
                            className="field"
                            type="password"
                            placeholder="••••••••"
                            value={pass}
                            onChange={manejarCambioDeInput(setPass)}
                            required
                        />
                    </div>

                    {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}

                    <button className="btn" type="submit" style={{ marginTop: '20px' }}>
                        Entrar al Sistema
                    </button>
                </form>
                <div style={{ marginTop: '15px', textAlign: 'center' }}>
                    <button className="linkLike" onClick={() => setLocation("/registro")}>
                        ¿No tenés cuenta? Registrate
                    </button>
                </div>
            </div>
        </div>
    );
}