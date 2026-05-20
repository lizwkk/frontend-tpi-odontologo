import { useState } from 'react'
import { Route, Switch, Redirect } from 'wouter'

import Login from "./paginas/Login";
import Registro from "./paginas/Registro"; 
import Inicio from "./paginas/Inicio";
import Admin from "./paginas/Admin";
import MisTurnos from "./paginas/MisTurnos";
import './App.css'

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [rol, setRol] = useState(localStorage.getItem('rol'));

  const manejarLogin = (t, r) => {
    setToken(t);
    setRol(r);
  };

  const manejarLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('nombre');
    localStorage.removeItem('id_usuario');
    setToken(null);
    setRol(null);
  };

  return (
    <Switch>
      {/* 🔐 LA RUTA RAÍZ AHORA ES TU LOGIN DIRECTAMENTE */}
      <Route path="/">
        {!token ? <Login onLogin={manejarLogin} /> : <Redirect to={rol === "admin" ? "/admin" : "/inicio"} />}
      </Route>

      {/* RUTAS PÚBLICAS */}
      <Route path="/registro">
        {token ? <Redirect to={rol === "admin" ? "/admin" : "/inicio"} /> : <Registro />}
      </Route>
      
      <Route path="/login">
        {token ? <Redirect to={rol === "admin" ? "/admin" : "/inicio"} /> : <Login onLogin={manejarLogin} />}
      </Route>

      {/* RUTAS PRIVADAS */}
      <Route path="/admin">
        {token && rol === "admin" ? <Admin onLogout={manejarLogOut} /> : <Redirect to="/login" />}
      </Route>

      <Route path="/inicio">
        {token && rol !== "admin" ? <Inicio onLogout={manejarLogOut} /> : <Redirect to="/login" />}
      </Route>

      {/* 🔒 RUTA PRIVADA PROTEGIDA: MIS TURNOS */}
      <Route path="/mis-turnos">
        {token && rol !== "admin" ? <MisTurnos /> : <Redirect to="/login" />}
      </Route>
      
      {/* CUALQUIER OTRA RUTA RARA VUELVE AL LOGIN */}
      <Route path="/:rest*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}