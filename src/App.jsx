import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexto/AuthContext";

import Login from "./paginas/Login";
import Registro from "./paginas/Registro";
import Home from "./paginas/Home";
import Inicio from "./paginas/Inicio";
import MisTurnos from "./paginas/MisTurnos";
import Admin from "./paginas/Admin";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.rol !== "admin") return <Navigate to="/inicio" replace />;
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
          <PrivateRoute>
            <Inicio />
          </PrivateRoute>
        }
      />

      <Route
        path="/mis-turnos"
        element={
          <PrivateRoute>
            <MisTurnos />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }
      />

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}