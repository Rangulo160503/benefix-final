const { listEmails } = require('../infrastructure/email/gmailReader');

async function obtenerCorreos() {
  const resultado = await listEmails();
  console.log('📦 Correos retornados desde listEmails():', resultado);
  return resultado;
}

module.exports = { obtenerCorreos };
