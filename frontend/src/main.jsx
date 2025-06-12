import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BusquedaProvider } from './context/BusquedaContext';
import { BrowserRouter } from "react-router-dom";
import PlayerContextProvider from "./context/PlayerContext.jsx";
import { CatalogosProvider } from "./context/CatalogosContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BusquedaProvider>
        <CatalogosProvider>
          <PlayerContextProvider>
            <App />
          </PlayerContextProvider>
        </CatalogosProvider>
      </BusquedaProvider>
    </BrowserRouter>
  </React.StrictMode>
);