import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// 🔴 ESTA LÍNEA ES LA QUE FALTABA O ESTÁ MAL
import { TurnosProvider } from "./contexto/TurnosContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TurnosProvider>
      <App />
    </TurnosProvider>
  </StrictMode>
);