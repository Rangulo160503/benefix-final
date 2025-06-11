import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext } from 'react';
import { BusquedaContext } from '../context/BusquedaContext';
import { useState } from "react";
import { useCatalogos } from "../context/CatalogosContext";
import ListaCatalogos from "./ListaCatalogos";
import ModalCatalogo from "./ModalCatalogo";


const Sidebar = () => {
  const navigate = useNavigate();
  const { setBusqueda } = useContext(BusquedaContext);

  const { catalogos, crearCatalogo, agregarBeneficioACatalogo, renombrarCatalogo, eliminarCatalogo } = useCatalogos();
const [editingId, setEditingId] = useState(null);
const [editedNombre, setEditedNombre] = useState("");
const [openModal, setOpenModal] = useState(false);
const [catalogoActivoId, setCatalogoActivoId] = useState(null);

const handleSaveNombre = (id) => {
  if (!editedNombre.trim()) return;
  renombrarCatalogo(id, editedNombre);
  setEditingId(null);
};



const handleCrearCatalogo = () => {
  const nuevoId = crearCatalogo("Mi catálogo nuevo");
  setCatalogoActivoId(nuevoId);
  setOpenModal(true);
};

const handleAgregarBeneficio = (beneficio) => {
  if (catalogoActivoId) {
    agregarBeneficioACatalogo(catalogoActivoId, beneficio);
  }
};

const beneficiosMock = [/* los beneficios que ya te pasé */];

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-black hidden lg:flex">
      <div className="bg-gray-100 h-[15%] rounded flex flex-col justify-around shadow">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 pl-8 cursor-pointer"
        >
            <img className="w-6 filter grayscale brightness-0 contrast-75" src={assets.home_icon} alt="home icon" />
          <p className="font-bold">Inicio</p>
        </div>
<div className="pl-9 pr-4 flex items-center gap-3 bg-transparent py-1 px-2">
  <img
    className="w-5 filter grayscale brightness-0 contrast-75"
    src={assets.search_icon}
    alt="search icon"
  />
  <input
    type="text"
    placeholder="Buscar"
    className="bg-transparent placeholder-black text-black font-bold text-sm outline-none border-none focus:outline-none focus:ring-0"
    onChange={(e) => setBusqueda(e.target.value)}
  />
</div>


      </div>

      <div className="bg-gray-100 h-[85%] rounded shadow overflow-y-auto">
  <div className="p-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <img className="w-8 filter grayscale brightness-0 contrast-75" src={assets.stack_icon} alt="stack icon" />
      <p className="font-semibold text-gray-800">Tus catálogos</p>
    </div>
    <div className="flex items-center gap-3">
      <img
        className="w-5 filter grayscale brightness-0 contrast-75 cursor-pointer"
        src={assets.plus_icon}
        alt="plus icon"
        onClick={handleCrearCatalogo}
      />
      <img
        className="w-5 filter grayscale brightness-0 contrast-75 cursor-pointer"
        src={assets.arrow_icon}
        alt="arrow icon"
        onClick={() => {
          if (catalogos.length > 0) {
            const ultimo = catalogos[catalogos.length - 1];
            navigate(`/catalogo/${ultimo.id}`);
          }
        }}
      />
    </div>
  </div>

  {catalogos.length > 0 ? (
    <ListaCatalogos
      catalogos={catalogos}
      navigate={navigate}
      editingId={editingId}
      editedNombre={editedNombre}
      setEditedNombre={setEditedNombre}
      onEdit={(id, nombre) => {
        setEditingId(id);
        setEditedNombre(nombre);
      }}
      onSaveNombre={handleSaveNombre}
      onDelete={(id) => eliminarCatalogo(id)}
    />
  ) : (
    <div className="p-4 bg-gray-100 m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
      <h1 className="text-gray-800">Crea tu primer catálogo de beneficios</h1>
      <p className="font-light text-gray-600">Te ayudamos!</p>
      <button
        className="px-4 py-1.5 bg-blue-600 text-white text-[15px] rounded-full mt-4 hover:bg-blue-700 transition"
        onClick={handleCrearCatalogo}
      >
        Crear catálogo
      </button>
    </div>
  )}

  <ModalCatalogo
    open={openModal}
    onClose={() => setOpenModal(false)}
    beneficiosDisponibles={beneficiosMock}
    onAgregar={handleAgregarBeneficio}
  />
</div>

    </div>
  );
};

export default Sidebar;