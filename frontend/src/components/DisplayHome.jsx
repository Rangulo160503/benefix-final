import { useState, useContext } from 'react';
import Navbar from "./Navbar";
import BenefitCard from './BenefitCard';
import { BusquedaContext } from '../context/BusquedaContext';
import BeneficioCardQRModal from "./BeneficioCardQRModal";

const DisplayHome = () => {
  const [benefits, setBenefits] = useState([
    {
      id: 1,
      name: "Crear beneficio",
      description: "Agrega un nuevo beneficio al catálogo.",
      image: "https://via.placeholder.com/400x200?text=Crear+Beneficio"
    },
    {
      id: 2,
      name: 'Cinemark',
      description: '50% de descuento todos los miércoles.',
      image: 'https://s3-media0.fl.yelpcdn.com/bphoto/cDkEQM_QYNuKGdMnB7J-cA/o.jpg',
    },
    {
      id: 3,
      name: 'Olive garden',
      description: '10% de descuento en comida saludable.',
      image: 'https://149446312.v2.pressablecdn.com/wp-content/uploads/2022/09/Olive-Garden-Manila-48-scaled.jpeg',
    }
  ]);

  const [modalQRAbierto, setModalQRAbierto] = useState(false);
  const [beneficioActual, setBeneficioActual] = useState(null);
  const { busqueda } = useContext(BusquedaContext);

  const agregarBeneficio = (nuevo) => {
    setBenefits([
      ...benefits,
      {
        id: Date.now(),
        name: nuevo.name,
        description: nuevo.description,
        image: "https://via.placeholder.com/400x200?text=Nuevo+Beneficio"
      }
    ]);
  };

  const eliminarBeneficio = (id) => {
    setBenefits((prev) => prev.filter((beneficio) => beneficio.id !== id));
  };

  const beneficiosFiltrados = benefits.filter(b =>
    b.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Todos los beneficios</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {beneficiosFiltrados.map((benefit) => (
            <BenefitCard
              key={benefit.id}
              benefit={benefit}
              onGuardar={agregarBeneficio}
              onEliminar={eliminarBeneficio}
              onClick={(beneficio) => {
                setBeneficioActual(beneficio);
                setModalQRAbierto(true);
              }}
            />
          ))}
        </div>
      </div>

      <BeneficioCardQRModal
        isOpen={modalQRAbierto}
        onClose={() => setModalQRAbierto(false)}
        benefit={beneficioActual}
        userEmail="cliente@correo.com"
      />
    </>
  );
};

export default DisplayHome;
