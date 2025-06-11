import { useState } from "react";
import PropTypes from "prop-types";
import ModalCrearBeneficio from "./ModalCrearBeneficio";


const BenefitCard = ({ benefit, onGuardar, onEliminar, onClick }) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const handleClick = () => {
  if (benefit.name === "Crear beneficio") {
    setIsModalOpen(true);
  } else if (onClick) {
    onClick(benefit); // ✅ activa el modal QR
  }
};
  const handleGuardar = (nuevoBeneficio) => {
  onGuardar(nuevoBeneficio);
  setIsModalOpen(false); // Opcional: cerrar modal después de guardar
  
};


  return (
    <>
      <div
        className="relative bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
        onClick={handleClick}
      >
           {benefit.name !== "Crear beneficio" && (
  <button
  onClick={(e) => {
    e.stopPropagation();
    onEliminar(benefit.id);
  }}
  className="absolute bottom-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-black text-white hover:bg-red-600 transition z-10"
  title="Eliminar beneficio"
>
  ✕
</button>

)}
   <img
          src={benefit.image}
          alt={benefit.name}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
          <div className="p-4">
        <h3 className="text-gray-800 text-lg font-bold mb-1">{benefit.name}</h3>
        <p className="text-gray-600 text-sm">{benefit.description}</p>
    </div>

      </div>

      {benefit.name === "Crear beneficio" && (
      <ModalCrearBeneficio
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGuardar={handleGuardar}
      />
      )}
    </>
  );
};


BenefitCard.propTypes = {
  benefit: PropTypes.shape({
        id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onGuardar: PropTypes.func.isRequired,
  onEliminar: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};

export default BenefitCard;
