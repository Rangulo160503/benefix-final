import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { catalogsData } from "../assets/catalogsData";

const DisplayCatalog = () => {
  const { id } = useParams();
  const catalog = catalogsData[id];

  if (!catalog) return <div className="text-white p-8">Catálogo no encontrado</div>;

  return (
    <div>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end px-8">
        <img className="w-48 rounded" src={catalog.image} alt={catalog.name} />
        <div className="flex flex-col">
          <p className="text-[#a7a7a7]">Catálogo</p>
          <h2 className="text-5xl font-bold mb-4 md:text-6xl text-white">{catalog.name}</h2>
          <h4 className="text-[#a7a7a7]">{catalog.desc}</h4>
        </div>
      </div>

      <div className="mt-10 px-8 text-white">
        {catalog.benefits.map((benefit) => (
          <div key={benefit.id} className="p-4 mb-4 border border-gray-700 rounded-lg hover:bg-[#ffffff2b]">
            <h3 className="text-xl font-semibold">{benefit.name}</h3>
            <p className="text-sm text-[#a7a7a7]">{benefit.description}</p>
            <p className="mt-2 text-sm">💰 <b>{benefit.price}</b></p>
            <p className="text-sm">🩺 Proveedor: {benefit.provider}</p>
            <p className="text-sm">📅 Vigente hasta: {benefit.validUntil}</p>
            <p className="text-sm">💳 Métodos de pago: {benefit.paymentMethods.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayCatalog;
