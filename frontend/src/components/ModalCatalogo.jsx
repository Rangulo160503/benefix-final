import { Dialog } from "@headlessui/react";
import PropTypes from 'prop-types';


const ModalCatalogo = ({ open, onClose, beneficiosDisponibles, onAgregar }) => {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      {/* Fondo oscuro */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Contenido del modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
          <Dialog.Title className="text-xl font-bold mb-4">Selecciona beneficios</Dialog.Title>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
            {beneficiosDisponibles.map((beneficio, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 flex flex-col items-center shadow-sm hover:shadow-md transition"
              >
                <img
                  src={beneficio.imagen}
                  alt={beneficio.nombre}
                  className="w-20 h-20 object-cover rounded-full mb-3"
                />
                <h3 className="font-semibold text-center">{beneficio.nombre}</h3>
                <p className="text-sm text-gray-600 text-center mb-3">{beneficio.descripcion}</p>
                <button
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition"
                  onClick={() => onAgregar(beneficio)}
                >
                  Agregar
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

ModalCatalogo.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  beneficiosDisponibles: PropTypes.arrayOf(
    PropTypes.shape({
      nombre: PropTypes.string.isRequired,
      descripcion: PropTypes.string.isRequired,
      imagen: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAgregar: PropTypes.func.isRequired,
};

export default ModalCatalogo;
