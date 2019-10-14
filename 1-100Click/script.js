// Variables globales
var numero_actual = 1;
var numero_max = 100;
var contenedor = document.getElementById("contenedor");
var cartel_ganado = document.createElement("div");
var cartel_perdido = document.createElement("div");
var intervalo_contador;
var boton_reiniciar = document.getElementById("boton_reiniciar");
boton_reiniciar.addEventListener(
  "click",
  (volverJugar = () => location.reload(true))
);

// Evento del botón "Jugar"
var boton_jugar = document.getElementById("jugar");
boton_jugar.addEventListener("click", jugar);

function jugar() {
  encenderContador();
  cargarNumeros();
  boton_reiniciar.style.visibility = "visible"; // Mostrar el botón de reiniciar
  var contenedor_jugar = document.getElementById("contenedor-boton_jugar");
  contenedor_jugar.style.display = "none"; // Quitar botón de jugar de la pantalla
}

// Contador
var display = document.getElementById("tiempo");
display.innerText = "04:00";
function encenderContador() {
  let minutos = 4 * 60 - 1;
  let contador = minutos,
    segundos;
  intervalo_contador = setInterval(function() {
    minutos = parseInt(contador / 60, 10);
    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = parseInt(contador % 60, 10);
    segundos = segundos < 10 ? "0" + segundos : segundos;
    display.textContent = minutos + ":" + segundos;
    if (--contador < 0) {
      finJuego(numero_actual);
    }
  }, 1000);
}

// Creación de Array inicial
function cargarNumeros() {
  var numeros = [];
  for (var i = 1; i <= numero_max; i++) {
    numeros.push(i);
  }
  numeros = mezclarNumerosArray(numeros);
  //Crear los botones con números del array desordenado al "azar"
  for (let i = 0; i < numero_max; i++) {
    var boton = document.createElement("button");
    boton.className = "boton_numero";
    boton.innerHTML = numeros[i];
    boton.addEventListener("click", logicaJuego);
    contenedor.appendChild(boton);
  }
}

function mezclarNumerosArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function logicaJuego() {
  this.disabled = true; // Desactivar botón pulsado
  if (comprobarNumeroClicado(this.innerText)) {
    mostrarRestantes(this.innerText);
    this.className = "acertado";
    if (this.innerText == numero_max) {
      finJuego(this.innerText);
    } else {
      numero_actual++;
    }
  } else {
    this.className = "fallado";
    finJuego(this.innerText);
  }
}

function mostrarRestantes() {
  var texto_restantes = document.getElementById("texto_restantes");
  texto_restantes.textContent = numero_max - numero_actual;
}

function comprobarNumeroClicado(valor) {
  return valor == numero_actual;
}

function finJuego(valor) {
  clearInterval(intervalo_contador);
  desactivarBotones();
  cargarMensajesFinales();
  if (valor == numero_max && comprobarNumeroClicado(valor)) {
    cartel_ganado.style.visibility = "visible";
  } else {
    cartel_perdido.style.visibility = "visible";
  }
}

function cargarMensajesFinales() {
  let mensaje_ganado = "¡Enhorabuena, has ganado! Puntuación: " + numero_max;
  let mensaje_perdido =
    "¡Vaya, has perdido! Puntuación: " + (numero_actual - 1);
  var boton_cerrar_1 = document.createElement("div");
  var boton_cerrar_2 = document.createElement("div");
  contenedor.appendChild(cartel_ganado);
  contenedor.appendChild(cartel_perdido);
  cartel_ganado.id = "mensaje_ganado";
  cartel_perdido.id = "mensaje_perdido";
  cartel_ganado.innerText = mensaje_ganado;
  cartel_perdido.innerText = mensaje_perdido;
  boton_cerrar_1.id = "boton_cerrar";
  boton_cerrar_1.innerText = "×";
  boton_cerrar_2.id = "boton_cerrar";
  boton_cerrar_2.innerText = "×";
  boton_cerrar_1.addEventListener("click", function() {
    this.parentNode.style.visibility = "hidden";
  });
  boton_cerrar_2.addEventListener("click", function() {
    this.parentNode.style.visibility = "hidden";
  });
  cartel_ganado.appendChild(boton_cerrar_1);
  cartel_perdido.appendChild(boton_cerrar_2);
}

function desactivarBotones() {
  var botones = document.getElementsByClassName("boton_numero");
  for (let i = 0; i < botones.length; i++) {
    botones[i].disabled = true;
    botones[i].style.color = "grey";
  }
}
