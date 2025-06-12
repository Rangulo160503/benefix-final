const express = require('express');
const router = express.Router();
const { obtenerCorreos } = require('../usecases/gmailReader');

router.get('/listar', async (req, res) => {
  try {
    const correos = await obtenerCorreos(); // tu función de lectura
    res.json(correos);
  } catch (err) {
    console.error('Error al obtener correos:', err);
    res.status(500).json({ error: 'Error al obtener correos' });
  }
});

module.exports = router;
