// src/context/BusquedaContext.jsx
import { createContext, useState } from 'react';
import PropTypes from "prop-types";


export const BusquedaContext = createContext();

export const BusquedaProvider = ({ children }) => {
  const [busqueda, setBusqueda] = useState("");

  return (
    <BusquedaContext.Provider value={{ busqueda, setBusqueda }}>
      {children}
    </BusquedaContext.Provider>
  );
};

BusquedaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};