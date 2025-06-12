const { extraerCamposDesdeCorreo } = require('./usecases/beneficioExtractor.openai');

async function test() {
  const correoSimulado = {
    asunto: "Nuevo convenio dental con AM Dental",
    cuerpo: `
Hola Ronald,

Adjunto la información de una clínica dental que ofrece un beneficio especial para colaboradores.

Nombre: AM Dental  
Dirección: San Rafael de Escazú, contiguo a Almacén El Rey  
Beneficio: 15% de descuento en ortodoncia  
Teléfono: 7020-1018  
Método de pago: SINPE Móvil o efectivo

Saludos,
Elizabeth
    `,
    archivosAdjuntos: [
      { nombre: "ListaPreciosAMDental.pdf", tipo: "pdf" },
      { nombre: "PromocionOrtodoncia.jpg", tipo: "imagen" }
    ]
  };

  const camposDetectados = await extraerCamposDesdeCorreo(correoSimulado);
  console.log("🧩 Campos detectados:", camposDetectados);
}

test();
