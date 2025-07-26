let cantidadPesos = Number(prompt("ingrese la cantidad de pesos argentinos"));

function convertirMoneda(cantidad, tasaCambio, nombreMonedaDestino) {
  let resultado = cantidad * tasaCambio;
  console.log(
    `${cantidad} pesos argentinos equivalen a ${resultado.toFixed(
      2
    )} ${nombreMonedaDestino}`
  );
  return resultado;
}

let tasaDeCambio = 0.005;
let nombreCripto = "Pataconex";

if (!isNaN(cantidadPesos) && cantidadPesos > 0) {
  let resultado = convertirMoneda(cantidadPesos, tasaDeCambio, nombreCripto);
  alert(
    `${cantidadPesos} pesos argentinos equivalen a ${resultado} ${nombreCripto}`
  );
} else {
  alert("El valor debe ser numérico y mayor que 0.");
}
