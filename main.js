let historial = JSON.parse(localStorage.getItem("historial")) || [];

async function convertir() {
  const cantidadPesos = Number(document.getElementById("cantidad").value);
  const monedaDestino = document.getElementById("moneda").value;

  if (!cantidadPesos || isNaN(cantidadPesos) || cantidadPesos <= 0) {
    Swal.fire({
      icon: "warning",
      title: "Valor inválido",
      text: "⚠️ Ingrese un valor numérico mayor que 0.",
    });
    return;
  }

  try {
    const res = await fetch("./data.json");
    const data = await res.json();

    const tasaDeCambio = data.rates[monedaDestino];
    if (!tasaDeCambio) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "❌ Moneda no encontrada.",
      });
      return;
    }

    const resultado = cantidadPesos * tasaDeCambio;

    // ✅ Guardar conversión en historial
    const conversion = {
      fecha: new Date().toLocaleString("es-AR"),
      cantidadARS: cantidadPesos,
      monedaDestino,
      resultado: resultado.toFixed(2),
    };

    historial.push(conversion);
    localStorage.setItem("historial", JSON.stringify(historial));

    // ✅ Mostrar notificación con SweetAlert2
    Swal.fire({
      icon: "success",
      title: "Conversión realizada",
      html: `
        <b>${conversion.cantidadARS.toLocaleString("es-AR")} ARS</b> =
        <b>${conversion.resultado} ${conversion.monedaDestino}</b><br>
        <small>(1 ARS = ${tasaDeCambio.toFixed(4)} ${monedaDestino})</small>
      `,
    });

    mostrarHistorial();
  } catch (error) {
    console.error("Error al leer JSON:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "❌ No se pudo leer el archivo JSON.",
    });
  }
}

// ✅ Mostrar historial en el HTML
function mostrarHistorial() {
  const divHistorial = document.getElementById("historial");
  divHistorial.innerHTML = "<h3>Historial</h3>";

  historial.forEach((conv) => {
    const p = document.createElement("p");
    p.textContent = `${conv.fecha}: ${conv.cantidadARS} ARS → ${conv.resultado} ${conv.monedaDestino}`;
    divHistorial.appendChild(p);
  });
}

// ✅ Al cargar la página, mostrar historial guardado en localStorage
document.addEventListener("DOMContentLoaded", mostrarHistorial);
