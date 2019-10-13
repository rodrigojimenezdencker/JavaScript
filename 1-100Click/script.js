// Variables globales
var numeroActual = 1;
var numeroMax = 100;
var contenedor = document.getElementById("contenedor");
var mensajeFinalGanado = document.createElement("div");
var mensajeFinalPerdido = document.createElement("div");
var intervaloContador;
var volverJugarBoton = document.getElementById("volver-jugar");
volverJugarBoton.addEventListener("click", volverJugar = () => location.reload(true));

// Evento del botón "Jugar"
var botonJugar = document.getElementById("jugar");
botonJugar.addEventListener("click", jugar);

function jugar() {
  encenderContador();
  cargarNumeros();
  volverJugarBoton.style.visibility = "visible"; // Mostrar el botón de reiniciar
  var contenedorJugar = document.getElementById("contenedor-jugar");
  contenedorJugar.style.display = "none"; // Quitar botón de jugar de la pantalla
}

// Contador
function encenderContador() {
  let minutos = ((4 * 60) - 1);
  let contador = minutos,
    segundos;
  intervaloContador = setInterval(function() {
    minutos = parseInt(contador / 60, 10);
    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = parseInt(contador % 60, 10);
    segundos = segundos < 10 ? "0" + segundos : segundos;
    var display = document.getElementById("tiempo");
    display.textContent = minutos + ":" + segundos;
    if (--contador < 0) {
      finJuego(numeroActual);
    }
  }, 1000);
}

// Creación de Array inicial
function cargarNumeros() {
  var numeros = [];
  for (var i = 1; i <= numeroMax; i++) {
    numeros.push(i);
  }
  numeros = mezclarNumerosArray(numeros);
  //Crear los botones con números del array desordenado al "azar"
  for (let i = 0; i < numeroMax; i++) {
    var boton = document.createElement("button");
    const j = Math.floor(Math.random() * (i + 1));
    boton.className = "botonNumero";
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
  if (this.innerText == numeroMax && comprobarNumeroClicado(this.innerText)) {
    mostrarRestantes(this.innerText);
    this.className = "acertado";
    finJuego(this.innerText);
  } else if (comprobarNumeroClicado(this.textContent)) {
    mostrarRestantes(this.innerText);
    this.className = "acertado";
    numeroActual++;
  } else {
    this.className = "fallado";
    finJuego(this.innerText);
  }
}

function mostrarRestantes() {
  var mensajeRestantes = document.getElementById("restantes");
  mensajeRestantes.textContent = numeroMax - numeroActual;
}

function comprobarNumeroClicado(valor) {
  return valor == numeroActual;
}

function finJuego(valor) {
  clearInterval(intervaloContador);
  desactivarBotones();
  cargarMensajesFinales();
  if (valor == numeroMax && comprobarNumeroClicado(valor)) {
    mensajeFinalGanado.style.visibility = "visible";
  } else {
    mensajeFinalPerdido.style.visibility = "visible";
  }
}
  
function cargarMensajesFinales() {
  let stringGanado = "¡Enhorabuena, has ganado! Puntuación: " + numeroMax;
  let stringPerdido = "¡Vaya, has perdido! Puntuación: " + (numeroActual - 1);
  contenedor.appendChild(mensajeFinalGanado);
  contenedor.appendChild(mensajeFinalPerdido);
  mensajeFinalGanado.id = "mensaje-ganado";
  mensajeFinalPerdido.id = "mensaje-perdido";
  mensajeFinalGanado.innerText = stringGanado;
  mensajeFinalPerdido.innerText = stringPerdido;  
  var botonCerrar1 = document.createElement("div");  
  botonCerrar1.id = "boton_cerrar";
  botonCerrar1.innerText = "×";
  var botonCerrar2 = document.createElement("div");  
  botonCerrar2.id = "boton_cerrar";
  botonCerrar2.innerText = "×";
botonCerrar1.addEventListener("click", function() {
    this.parentNode.style.visibility = "hidden";
  });
  botonCerrar2.addEventListener("click", function() {
    this.parentNode.style.visibility = "hidden";
  });
  mensajeFinalGanado.appendChild(botonCerrar1);
  mensajeFinalPerdido.appendChild(botonCerrar2);
}

function desactivarBotones() {
  var botones = document.getElementsByClassName("botonNumero");
  for (let i = 0; i < botones.length; i++) {
    botones[i].disabled = true;
    botones[i].style.color = "grey";
  }
}
