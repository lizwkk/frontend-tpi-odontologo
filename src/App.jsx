import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./paginas/Login";
import Registro from "./paginas/Registro";
import Inicio from "./paginas/Inicio";
import MisTurnos from "./paginas/MisTurnos";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/mis-turnos" element={<MisTurnos />} />
      </Routes>
    </BrowserRouter>
  );
}