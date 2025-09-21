async function convertir() {
  const cantidadPesos = Number(document.getElementById("cantidad").value);
  const monedaDestino = document.getElementById("moneda").value;
  const resultadoDiv = document.getElementById("resultado");

  if (!cantidadPesos || isNaN(cantidadPesos) || cantidadPesos <= 0) {
    resultadoDiv.innerHTML =
      "<p style='color:red;'>⚠️ Ingrese un valor numérico mayor que 0.</p>";
    return;
  }

  try {
    const res = await fetch("./data.json"); // JSON local
    const data = await res.json();

    const tasaDeCambio = data.rates[monedaDestino];
    if (!tasaDeCambio) {
      resultadoDiv.innerHTML =
        "<p style='color:red;'>❌ Moneda no encontrada.</p>";
      return;
    }

    const resultado = cantidadPesos * tasaDeCambio;

    resultadoDiv.innerHTML = `
      <p style="color:#2e7d32;">
        💵 ${cantidadPesos.toLocaleString("es-AR")} ARS =
        <b>${resultado.toFixed(2)} ${monedaDestino}</b>
      </p>
      <p style="font-size:0.9em;color:#555;">
        (1 ARS = ${tasaDeCambio.toFixed(4)} ${monedaDestino})
      </p>
    `;
  } catch (error) {
    console.error("Error al leer JSON:", error);
    resultadoDiv.innerHTML =
      "<p style='color:red;'>❌ No se pudo leer el archivo JSON.</p>";
  }
}
