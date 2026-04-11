import { useState, useEffect } from 'react'
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

  useEffect(() => {
    if (!token) {
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
    }
  }, [token]);

  const manejarLogOut = () => {
    localStorage.clear();
    setToken(null);
    setRol(null);
  };

  // 1. SI NO HAY TOKEN (Público)
  if (!token) {
    return (
      <Switch>
        {/* CORRECCIÓN 1: Agregamos la ruta raíz "/" para que no quede en blanco al entrar */}
        <Route path="/">
          <Redirect to="/home" />
        </Route>
        
        <Route path="/home"><Home /></Route>
        <Route path="/login">
          <Login onLogin={(t, r) => { setToken(t); setRol(r); }} />
        </Route>
        <Route path="/registro">
          <Registro onLogin={(t, r) => { setToken(t); setRol(r); }} />
        </Route>
        <Route path="/:rest*"><Redirect to="/home" /></Route> 
      </Switch>
    );
  }

  // 2. SI HAY TOKEN (Privado)
  return (
    <Switch>
      {/* CORRECCIÓN 2: Ruta raíz cuando estás logueado */}
      <Route path="/">
        <Redirect to={rol === "admin" ? "/admin" : "/inicio"} />
      </Route>

      {/* Rutas de ADMIN */}
      {rol === "admin" && (
        <Route path="/admin">
          <Admin onLogout={manejarLogOut} />
        </Route>
      )}

      {/* Rutas de USUARIO */}
      {rol !== "admin" && (
        <Route path="/inicio">
          <Inicio onLogout={manejarLogOut} />
        </Route>
      )}
      {rol !== "admin" && (
        <Route path="/mis-turnos">
          <MisTurnos />
        </Route>
      )}

      <Route path="/:rest*">
        {rol === "admin" ? <Redirect to="/admin" /> : <Redirect to="/inicio" />}
      </Route>
    </Switch>
  );
}