import { useState } from 'react'
import { Route, Switch, Redirect } from 'wouter'

import Login from "./paginas/Login";
import Registro from "./paginas/Registro"; 
import Home from "./paginas/Home";
import Inicio from "./paginas/Inicio";
import MisTurnos from "./paginas/MisTurnos";
import Admin from "./paginas/Admin";
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
      {/* RUTAS PÚBLICAS */}
      <Route path="/home"><Home /></Route>
      <Route path="/registro"><Registro /></Route>
      <Route path="/login">
        {token ? <Redirect to="/inicio" /> : <Login onLogin={manejarLogin} />}
      </Route>

      {/* RUTAS PRIVADAS */}
      <Route path="/admin">
        {token && rol === "admin" ? <Admin onLogout={manejarLogOut} /> : <Redirect to="/login" />}
      </Route>

      <Route path="/inicio">
        {token && rol !== "admin" ? <Inicio onLogout={manejarLogOut} /> : <Redirect to="/login" />}
      </Route>

      <Route path="/mis-turnos">
        {token && rol !== "admin" ? <MisTurnos onLogout={manejarLogOut} /> : <Redirect to="/login" />}
      </Route>

      {/* REDIRECCIÓN POR DEFECTO */}
      <Route path="/">
        {!token ? <Home /> : <Redirect to={rol === "admin" ? "/admin" : "/inicio"} />}
      </Route>
      
      <Route path="/:rest*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}