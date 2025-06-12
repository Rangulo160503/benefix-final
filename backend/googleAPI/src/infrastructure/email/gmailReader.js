const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const CREDENTIALS_PATH = path.join(__dirname, '../../credentials/oauth_credentials.json');
const TOKEN_PATH = path.join(__dirname, '../../../token/token.json');

function authorize() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  const { client_secret, client_id, redirect_uris } = credentials.web || credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    oAuth2Client.setCredentials(token);
    oAuth2Client.on('tokens', (newTokens) => {
  if (newTokens.refresh_token || newTokens.access_token) {
    const merged = {
      ...token,
      ...newTokens
    };
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(merged, null, 2));
    console.log('♻️ Token actualizado automáticamente en', TOKEN_PATH);
  }
});

    return Promise.resolve(oAuth2Client);
  }

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('\n🔐 Autenticación requerida');
  console.log('Visita esta URL, autoriza el acceso y pega el código aquí:\n');
  console.log(authUrl);

  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    readline.question('\nCódigo: ', (code) => {
      readline.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return reject('❌ Error al recuperar el token: ' + err);
        oAuth2Client.setCredentials(token);
        fs.mkdirSync(path.dirname(TOKEN_PATH), { recursive: true });
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
        console.log('✅ Token guardado en', TOKEN_PATH);
        resolve(oAuth2Client);
      });
    });
  });
}

async function listEmails() {
  const auth = await authorize();
  const gmail = google.gmail({ version: 'v1', auth });

  const res = await gmail.users.messages.list({
    userId: 'me',
    maxResults: 5,
    labelIds: ['INBOX'],
  });

  const messages = res.data.messages || [];
  console.log(`\n📨 Últimos ${messages.length} correos:\n`);

  const resultado = [];

  for (const msg of messages) {
    const msgDetail = await gmail.users.messages.get({
      userId: 'me',
      id: msg.id,
    });
    console.log(JSON.stringify(msgDetail.data.payload, null, 2));

    const body = extractBody(msgDetail.data.payload);
    const headers = msgDetail.data.payload.headers;
    const from = headers.find(h => h.name === 'From')?.value || '(sin remitente)';
    const subject = headers.find(h => h.name === 'Subject')?.value || '(sin asunto)';

    resultado.push({ from, subject, body }); // ✅ ESTA PARTE DEVUELVE LO QUE VAS A VER EN EL API
  }

console.log('✅ Resultado final a enviar al API:', resultado);

  return resultado; // ✅ CLAVE: RETORNAR LOS RESULTADOS
}

function extractBody(payload) {
  if (!payload) return '';

  // Caso 1: mensaje simple (sin partes)
  if (payload.body && payload.body.data) {
    return Buffer.from(payload.body.data, 'base64').toString('utf-8');
  }

  // Caso 2: multipart (html, texto plano, etc)
  if (payload.parts && payload.parts.length) {
    const part = payload.parts.find(p => p.mimeType === 'text/plain') || payload.parts[0];
    if (part.body && part.body.data) {
      return Buffer.from(part.body.data, 'base64').toString('utf-8');
    }
  }

  return '';
}

module.exports = {
  listEmails
};
