import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext } from 'react';
import { BusquedaContext } from '../context/BusquedaContext';



const Sidebar = () => {
  const navigate = useNavigate();
  const { setBusqueda } = useContext(BusquedaContext);

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

      <div className="bg-gray-100 h-[85%] rounded shadow">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
          <img className="w-8 filter grayscale brightness-0 contrast-75" src={assets.stack_icon} alt="stack icon" />
          <p className="font-semibold text-gray-800">Beneficios</p>
          </div>
          <div className="flex items-center gap-3">
          <img className="w-5 filter grayscale brightness-0 contrast-75" src={assets.plus_icon} alt="plus icon" />
          <img className="w-5 filter grayscale brightness-0 contrast-75" src={assets.arrow_icon} alt="arrow icon" />
          </div>
        </div>

        <div className="p-4 bg-gray-100 m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <h1 className="text-gray-800">Crea tu primer catálogo de beneficios</h1>
          <p className="font-light text-gray-600">Te ayudamos!</p>
          <button className="px-4 py-1.5 bg-blue-600 text-white text-[15px] rounded-full mt-4 hover:bg-blue-700 transition">
            Crear catálogo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;