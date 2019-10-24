let ultimoNumeroParaGanar = null;
let saldoInicial = 10;
let saldoActual = saldoInicial;
let numeros_ganadores = [7, 11];
let numeros_perdedores = [2, 3, 11];
let numero_perdedor_segunda_ronda = 7;
document.getElementById("boton_tirar").addEventListener("click", mezclar);
document.getElementById("boton_volver_tirar").addEventListener("click", mezclar);
let saldo = document.getElementById("saldo");
saldo.innerText = saldoInicial;
let info_jugada = document.getElementById("info_jugada");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function mezclar(){
    info_jugada.innerText = "";
    let dado1;
    let dado2;
    for (let i = 0; i < 10; i++) {
        dado1 = Math.floor(Math.random() * 6 + 1);
        dado2 = Math.floor(Math.random() * 6 + 1);
        document.getElementById("dado1").src = "./img_dados/dado" + dado1 + ".png";
        document.getElementById("dado2").src = "./img_dados/dado" + dado2 + ".png";
        await sleep(60);
    }
    comprobarSiGanado(comprobarNumero(dado1, dado2));
}

function comprobarNumero(numero1, numero2){
    let numeroFinal = numero1 + numero2;
    return numeroFinal;
}

function comprobarSiGanado(numero){
    if (ultimoNumeroParaGanar == null){
        if (numeros_ganadores.includes(numero)) {
            info_jugada.innerText = "Has ganado";
            saldo.innerText = parseInt(saldo.innerText) + 1;
        } else if (numeros_perdedores.includes(numero)) {
            info_jugada.innerText = "Has ganado";
            saldo.innerText = parseInt(saldo.innerText) - 1;
        } else {
            document.getElementById("boton_tirar").style.display = "none";
            document.getElementById("boton_volver_tirar").style.display = "block";
            ultimoNumeroParaGanar = numero;
        }
    } else {
        if (numero == numero_perdedor_segunda_ronda) {
            info_jugada.innerText = "Has perdido";
            ultimoNumeroParaGanar = null;
            saldo.innerText = parseInt(saldo.innerText) - 1;
            document.getElementById("boton_tirar").style.display = "block";
            document.getElementById("boton_volver_tirar").style.display = "none";
        } else if (numero == ultimoNumeroParaGanar) {
            info_jugada.innerText = "Has ganado";
            ultimoNumeroParaGanar = null;
            saldo.innerText = parseInt(saldo.innerText) + 1;
            document.getElementById("boton_tirar").style.display = "block";
            document.getElementById("boton_volver_tirar").style.display = "none";
        } else {
            ultimoNumeroParaGanar = numero;
        }
    }
}
