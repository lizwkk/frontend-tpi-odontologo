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

  if (!token) {
    return (
      <Switch>
        <Route path="/home"><Home /></Route>
        <Route path="/login">
          <Login onLogin={(t, r) => { setToken(t); setRol(r); }} />
        </Route>
        <Route path="/registro"><Registro /></Route>
        <Redirect to="/home" />
      </Switch>
    );
  }
  return (
    <Switch>
      {rol === "admin" ? (
        <>
          <Route path="/admin">
            <Admin onLogout={manejarLogOut} />
          </Route>
          <Redirect to="/admin" />
        </>
      ) : (
        <>
          <Route path="/inicio"><Inicio onLogout={manejarLogOut} /></Route>
          <Route path="/mis-turnos"><MisTurnos /></Route>
          <Redirect to="/inicio" />
        </>
      )}
    </Switch>
  );
}