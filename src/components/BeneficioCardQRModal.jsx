import { useState } from 'react';
import QRCode from 'react-qr-code';
import PropTypes from 'prop-types';

const BeneficioCardQRModal = ({ isOpen, onClose, benefit, userEmail }) => {
  const [enviado, setEnviado] = useState(false);

  const handleSolicitudBeneficio = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/beneficio/solicitar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          beneficioId: benefit.id,
          cliente: userEmail,
          intermediario: 'intermediario@benefix.com',
        }),
      });
      if (res.ok) {
        console.log('📤 Solicitud enviada');
        setEnviado(true);
        setTimeout(() => {
          setEnviado(false);
          onClose();
        }, 1200);
      } else {
        throw new Error('❌ Error en la respuesta');
      }
    } catch (err) {
      console.error('❌ Error al solicitar beneficio:', err);
    }
  };

  if (!isOpen || !benefit) return null;

  console.log("📦 benefit recibido en modal:", benefit);

  const qrValue = benefit.id ? `beneficio:${benefit.id}` : 'beneficio:desconocido';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
        <h2 className="text-xl font-semibold mb-2">{benefit.name}</h2>
        <p className="mb-4">{benefit.description}</p>

        <div className="relative inline-block">
          <QRCode value={qrValue} size={160} />
          <button
            onClick={handleSolicitudBeneficio}
            className="absolute inset-0 w-full h-full bg-transparent cursor-pointer"
            aria-label="Enviar solicitud"
          ></button>
        </div>

        {enviado && <p className="mt-4 text-green-600 font-semibold">✅ Solicitud enviada</p>}

        <button
          className="mt-6 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

BeneficioCardQRModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  benefit: PropTypes.object,
  userEmail: PropTypes.string.isRequired,
};

export default BeneficioCardQRModal;
