import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexto/AuthContext.jsx";

import Login from "./paginas/Login";
import Registro from "./paginas/Registro";
import Home from "./paginas/Home";
import Inicio from "./paginas/Inicio";
import MisTurnos from "./paginas/MisTurnos";
import Admin from "./paginas/Admin";

function RutaPrivada({ children }) {
  const { isAuth } = useAuth();
  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
}

function RutaAdmin({ children }) {
  const { isAuth, isAdmin } = useAuth();
  if (!isAuth) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/inicio" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      <Route
        path="/inicio"
        element={
          <RutaPrivada>
            <Inicio />
          </RutaPrivada>
        }
      />
      <Route
        path="/mis-turnos"
        element={
          <RutaPrivada>
            <MisTurnos />
          </RutaPrivada>
        }
      />
      <Route
        path="/admin"
        element={
          <RutaAdmin>
            <Admin />
          </RutaAdmin>
        }
      />

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}