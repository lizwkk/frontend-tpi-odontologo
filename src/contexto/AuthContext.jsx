import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);
const API = "http://localhost:3000/api";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  console.log("Token inicial:", token);
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  async function loginApi(email, pass) {
    const r = await fetch(`${API}/usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pass }),
    });

    localStorage.clear();
    const txt = await r.text();
    console.log("Respuesta login:", { status: r.status, text: txt });
    if (!r.ok) throw new Error(txt || "Credenciales incorrectas");

    let data;
    try {
      data = JSON.parse(txt);
    } catch {
      throw new Error("Respuesta inválida del servidor");
    }

    // esperamos: { token, user }
    if (!data.token || !data.user) throw new Error("Falta token/user en respuesta");

    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("token", data.token);
    console.log("Token logueado:" +token);
    return data.user;
  }

  async function registerApi(nombre, email, pass) {
    const r = await fetch(`${API}/usuarios/registro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, pass }),
    });

    const txt = await r.text();
    if (!r.ok) throw new Error(txt || "No se pudo registrar");
    return true;
  }

  function logout() {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuth: !!token,
      isAdmin: user?.rol === "admin",
      loginApi,
      registerApi,
      logout,
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}