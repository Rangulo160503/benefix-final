import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const ModalCrearBeneficio = ({ isOpen, onClose, onGuardar }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [correoSeleccionadoId, setCorreoSeleccionadoId] = useState("");
  const [correos, setCorreos] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetch("http://localhost:3001/api/correos/listar")
        .then((res) => res.json())
        .then((data) => setCorreos(data))
        .catch((err) => console.error("❌ Error al cargar correos:", err));
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !descripcion.trim()) return;

    onGuardar({
      name: nombre,
      description: descripcion
    });

    setNombre("");
    setDescripcion("");
    setCorreoSeleccionadoId("");
    onClose();
  };

  const handleRellenarDesdeCorreo = () => {
  console.log("🛠️ Ejecutando handleRellenarDesdeCorreo...");

  const correo = correos[parseInt(correoSeleccionadoId)];
  if (correo) {
    console.log("🧪 Cuerpo del correo seleccionado:", correo.body);

    const lineas = correo.body.split(/\r?\n/);
    let nombreExtraido = "";
    let descripcionExtraida = "";

    for (let linea of lineas) {
      const clean = linea.trim();
      if (nombreExtraido && descripcionExtraida) break;

      if (!nombreExtraido && /(clínica|empresa|restaurante|consultorio|instituto)/i.test(clean)) {
        nombreExtraido = clean;
      }

      if (!descripcionExtraida && /(descuento|%|promoción|oferta)/i.test(clean)) {
        descripcionExtraida = clean;
      }
    }

    setNombre(nombreExtraido || "Nombre no identificado");
    setDescripcion(descripcionExtraida || "Descripción no encontrada");
  }
};


  if (!isOpen) return null;

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
              <option value="">Seleccionar correo</option>
              {correos.map((correo, index) => (
                <option key={index} value={index}>
                  {correo.subject}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
              onClick={handleRellenarDesdeCorreo}
              disabled={!correoSeleccionadoId}
            >
              Rellenar
            </button>

            <button
              type="button"
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button type="submit" className="bg-blue-600 text-white px-4 py-1.5 rounded">
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
