function convertirMoneda(cantidad, tasaCambio, nombreMonedaDestino) {
  return cantidad * tasaCambio;
}

function convertir() {
  let cantidadPesos = Number(document.getElementById("cantidad").value);
  let tasaDeCambio = 0.005; // Ejemplo: 1 peso = 0.005 USD
  let nombreMoneda = "USD";
  let resultadoDiv = document.getElementById("resultado");

  if (cantidadPesos > 0 && !isNaN(cantidadPesos)) {
    let resultado = convertirMoneda(cantidadPesos, tasaDeCambio, nombreMoneda);
    resultadoDiv.textContent = `${cantidadPesos} ARS = ${resultado.toFixed(
      2
    )} ${nombreMoneda}`;
  } else {
    resultadoDiv.textContent = "⚠️ Ingrese un valor numérico mayor que 0.";
  }
}
