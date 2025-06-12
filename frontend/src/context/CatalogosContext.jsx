import PropTypes from "prop-types";

import { createContext, useContext, useState } from "react";

// Crear el contexto
const CatalogosContext = createContext();

// Crear el provider
export const CatalogosProvider = ({ children }) => {
  
  const [catalogoSeleccionado, setCatalogoSeleccionado] = useState(null);
  const seleccionarCatalogo = (id) => {
    
  const encontrado = catalogos.find(cat => cat.id === id);
  setCatalogoSeleccionado(encontrado || null);
};


  const [catalogos, setCatalogos] = useState([]);

  // Crear catálogo
  const crearCatalogo = (nombre) => {
    const nuevo = {
      id: Date.now(), // ID único basado en timestamp
      nombre,
      beneficios: []
    };
    setCatalogos((prev) => [...prev, nuevo]);
    return nuevo.id;
  };

  // Agregar beneficio a un catálogo
  const agregarBeneficioACatalogo = (catalogoId, beneficio) => {
    setCatalogos((prev) =>
      prev.map((cat) =>
        cat.id === catalogoId
          ? { ...cat, beneficios: [...cat.beneficios, beneficio] }
          : cat
      )
    );
  };

  // Renombrar un catálogo
  const renombrarCatalogo = (catalogoId, nuevoNombre) => {
    setCatalogos((prev) =>
      prev.map((cat) =>
        cat.id === catalogoId
          ? { ...cat, nombre: nuevoNombre }
          : cat
      )
    );
  };

  // Seleccionar un catálogo

  const eliminarCatalogo = (id) => {
  setCatalogos((prev) => prev.filter((cat) => cat.id !== id));
};


  CatalogosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

  return (
    <CatalogosContext.Provider
      value={{
        catalogos,
        crearCatalogo,
        agregarBeneficioACatalogo,
        renombrarCatalogo,
        eliminarCatalogo,
        catalogoSeleccionado,
        seleccionarCatalogo,
      }}
    >
      {children}
    </CatalogosContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useCatalogos = () => useContext(CatalogosContext);
