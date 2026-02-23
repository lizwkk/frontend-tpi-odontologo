import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./paginas/Login";
import Registro from "./paginas/Registro";
import Home from "./paginas/Home";
import Inicio from "./paginas/Inicio";
import MisTurnos from "./paginas/MisTurnos";
import Admin from "./paginas/Admin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      <Route path="/inicio" element={<Inicio />} />
      <Route path="/mis-turnos" element={<MisTurnos />} />
      <Route path="/admin" element={<Admin />} />

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}