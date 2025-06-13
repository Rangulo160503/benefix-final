  require('dotenv').config();

  const express = require('express');
  const app = express();
  const PORT = process.env.PORT || 3001;

  const { obtenerCorreos } = require('./usecases/gmailReader');

  const cors = require('cors');
  app.use(cors());


  // Opcional: verificar que funcione
  obtenerCorreos().catch(console.error);

  const correosRoutes = require('./routes/correos.routes');
  app.use('/api/correos', correosRoutes);

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
