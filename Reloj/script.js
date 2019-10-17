document.write(
  '<div id="segundos"></div>\n<div id="minutos"></div>\n<div id="horas"></div>'
);

var cuadrados = document.createElement("div");
cuadrados.className = "cuadrados";
var contadorSegundos = 1;
var contadorMinutos = 1;
var contadorHoras = 1;
var segundos = document.getElementById("segundos");
var minutos = document.getElementById("minutos");
var horas = document.getElementById("horas");

// Una forma de hacer
//   setInterval(function() {
//     cuadrados.innerText = contadorSegundos;
//     segundos.appendChild(cuadrados.cloneNode(true));
//     contadorSegundos++;
//     if (contadorSegundos > 60) {
//       borrarCajas(segundos);
//       contadorSegundos = 1;
//       cuadrados.innerText = contadorMinutos++;
//       minutos.appendChild(cuadrados.cloneNode(true));
//     }
//     if (contadorMinutos > 60){
//         borrarCajas(minutos);
//         contadorMinutos = 1;
//         cuadrados.innerText = contadorHoras++;
//         horas.appendChild(cuadrados.cloneNode(true));
//     }
//     if (contadorHoras > 24) {
//         borrarCajas(horas);
//     }
//   }, 1000);

// Otra forma de hacer
setInterval(function() {
  cuadrados.innerText = contadorSegundos;
  segundos.appendChild(cuadrados.cloneNode(true));
  contadorSegundos++;
  if (contadorSegundos > 60) {
    borrarCajas(segundos);
    contadorSegundos = 1;
  }
}, 1000);

setInterval(function() {
  cuadrados.innerText = contadorMinutos;
  minutos.appendChild(cuadrados.cloneNode(true));
  contadorMinutos++;
  if (contadorMinutos > 60) {
    borrarCajas(minutos);
    contadorMinutos = 1;
  }
}, 60000);

setInterval(function() {
  cuadrados.innerText = contadorHoras;
  horas.appendChild(cuadrados.cloneNode(true));
  contadorHoras++;
  if (contadorHoras > 60) {
    borrarCajas(horas);
    contadorHoras = 1;
  }
}, 3600000);

function borrarCajas(nodo) {
  var last;
  while ((last = nodo.lastChild)) nodo.removeChild(last);
}
