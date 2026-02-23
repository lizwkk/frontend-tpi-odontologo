import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./App.css";

import { TurnosProvider } from "./contexto/TurnosContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <TurnosProvider>
        <App />
      </TurnosProvider>
    </BrowserRouter>
  </React.StrictMode>
);