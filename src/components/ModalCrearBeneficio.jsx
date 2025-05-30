import { useState } from "react";
import PropTypes from 'prop-types';


const correosMock = [
  {
    id: 1,
    asunto: "Beneficio: Clínica Dental XYZ",
    cuerpo: "Nombre: Clínica Dental XYZ\nDescripción: 10% de descuento en ortodoncia",
  },
  {
    id: 2,
    asunto: "Beneficio: Olive Garden",
    cuerpo: "Nombre: Olive Garden\nDescripción: 10% de descuento en comida saludable",
  },
];



const ModalCrearBeneficio = ({ isOpen, onClose, onGuardar }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [correoSeleccionadoId, setCorreoSeleccionadoId] = useState("");

  
  const handleSubmit = (e) => {
  e.preventDefault();

  if (!nombre.trim() || !descripcion.trim()) return;

  onGuardar({
    name: nombre,
    description: descripcion
  });

  // limpiar y cerrar
  setNombre("");
  setDescripcion("");
  setCorreoSeleccionadoId("");
  onClose();
};


  if (!isOpen) return null;

  const handleRellenarDesdeCorreo = () => {
    const correo = correosMock.find(c => c.id === parseInt(correoSeleccionadoId));
    if (correo) {
      const nombreMatch = correo.cuerpo.match(/Nombre:\s(.+)/);
      const descripcionMatch = correo.cuerpo.match(/Descripción:\s(.+)/);

      setNombre(nombreMatch ? nombreMatch[1] : "");
      setDescripcion(descripcionMatch ? descripcionMatch[1] : "");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Crear nuevo beneficio</h2>

<form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium">Nombre</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Ej: Clínica Dental XYZ"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium">Descripción</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              placeholder="Ej: 10% de descuento en ortodoncia"
              value={descripcion}
      onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
            
          </div>
          
<div>
<select
    className="w-full border rounded px-3 py-2"
    value={correoSeleccionadoId}
    onChange={(e) => setCorreoSeleccionadoId(e.target.value)}
  >
    <option value="">Correo</option>
    {correosMock.map((correo) => (
      <option key={correo.id} value={correo.id}>
        {correo.asunto}
      </option>
    ))}
  </select>
</div>


          <div className="flex justify-end gap-2">
            <div>
  
  <button
    type="button"
      className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
    onClick={handleRellenarDesdeCorreo}
    disabled={!correoSeleccionadoId}
  >
    Rellenar
  </button>
</div>
            <button
              type="button"
      className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
              onClick={onClose}
            >
              Cancelar
            </button>
            
            <button type="submit"       className="bg-blue-600 text-white px-4 py-1.5 rounded">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
ModalCrearBeneficio.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
    onGuardar: PropTypes.func.isRequired, 
};


export default ModalCrearBeneficio;
