const imaps = require('imap-simple');
const dotenv = require('dotenv');
dotenv.config();

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '[OK]' : '[EMPTY]');
console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('EMAIL_PORT:', process.env.EMAIL_PORT);


const config = {
  imap: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASS,
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    tls: true,
    authTimeout: 5000,
    debug: console.log
  },
};

async function testIMAPConnection() {
  try {
    console.log('🔐 EMAIL_PASS:', process.env.EMAIL_PASS);
    const connection = await imaps.connect(config);
    console.log('✅ Conexión exitosa al inbox.');
    await connection.end();
  } catch (error) {
    if (!process.env.EMAIL_PASS) {
    console.error('❌ Error al conectar:', error.message);
    }}
}

module.exports = {
  testIMAPConnection,
};
