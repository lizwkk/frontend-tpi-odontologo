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
    const t = localStorage.getItem('token');
    const r = localStorage.getItem('rol');
    if (t) {
      setToken(t);
      setRol(r);
    }
  }, []);

  const manejarLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('nombre');
    setToken(null);
    setRol(null);
  };

  if (!token) {
    return (
      <Switch>
        <Route path="/home"><Home /></Route>
        <Route path="/login">
          <Login onLogin={(t, r) => { setToken(t); setRol(r); }} />
        </Route>
        <Route path="/registro">
          <Registro /> 
        </Route>
        <Route path="/:rest*"><Redirect to="/home" /></Route> 
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/">
        <Redirect to={rol === "admin" ? "/admin" : "/inicio"} />
      </Route>

    
      {rol === "admin" && (
        <Route path="/admin">
          <Admin onLogout={manejarLogOut} />
        </Route>
      )}

    
      {rol !== "admin" && (
        <Route path="/inicio">
          <Inicio onLogout={manejarLogOut} />
        </Route>
      )}

      
      {rol !== "admin" && (
        <Route path="/mis-turnos">
          <MisTurnos onLogout={manejarLogOut} />
        </Route>
      )}

      <Route path="/:rest*">
        <Redirect to={rol === "admin" ? "/admin" : "/inicio"} />
      </Route>
    </Switch>
  );
}