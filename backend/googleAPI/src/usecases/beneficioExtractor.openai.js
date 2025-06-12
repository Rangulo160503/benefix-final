// src/usecases/beneficioExtractor.openai.js

const { OpenAI } = require("openai");
const dotenv = require("dotenv");

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Extrae campos dinámicos de un correo usando OpenAI
 * @param {Object} params
 * @param {string} params.asunto - Asunto del correo
 * @param {string} params.cuerpo - Contenido del correo (HTML o texto plano)
 * @param {Array} params.archivosAdjuntos - Array con objetos tipo { nombre, tipo }
 */
async function extraerCamposDesdeCorreo({ asunto, cuerpo, archivosAdjuntos = [] }) {
  const prompt = `
Tu tarea es detectar y estructurar información útil para crear un beneficio a partir de un correo electrónico.

🔹 Asunto del correo:
${asunto}

🔹 Cuerpo del correo:
${cuerpo}

🔹 Archivos adjuntos:
${archivosAdjuntos.length > 0
      ? archivosAdjuntos.map((f) => `- ${f.nombre} (${f.tipo})`).join("\n")
      : "No hay archivos adjuntos."
    }

📌 Requisitos:
- Devuelve un arreglo JSON con campos dinámicos.
- Cada campo debe tener: 
  • "nombre" (etiqueta del campo),
  • "valorDetectado" (el valor extraído del texto),
  • "tipoCampo" (texto, número, archivo, fecha, teléfono, etc.).
- Si algún valor no está claro, usa "valorDetectado": "por definir".
- No devuelvas explicaciones, solo el arreglo JSON.

Ejemplo:
[
  { "nombre": "Nombre del lugar", "valorDetectado": "Clínica XYZ", "tipoCampo": "texto" },
  { "nombre": "Descuento", "valorDetectado": "15% en ortodoncia", "tipoCampo": "texto" }
]
`;

  try {
    const respuesta = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const contenido = respuesta.choices[0].message.content.trim();

    // Intentamos convertir el contenido a JSON
    try {
      return JSON.parse(contenido);
    } catch (error) {
      console.error("❌ Error al interpretar la respuesta de OpenAI:", contenido);
      return [];
    }

  } catch (error) {
    console.error("❌ Error al llamar a la API de OpenAI:", error.message);
    return [];
  }
}

module.exports = {
  extraerCamposDesdeCorreo,
};
