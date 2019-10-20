let company = {
    "lineas": 0,
    "precio_linea": 0.1,
    "minions": 0,
    "coste_minion": 10,
    "dinero": 0,
    "oficinas": 1,
    "capacidad_oficinas": 50,
    "coste_oficina": 1000,
    "productividad": 10000,
    "discos_duros": 1,
    "capacidad_discos_duros": 10000000,
    "coste_discos_duros": 100
}

let powerups_costs = {
    "formador": 1000,
    "maquina_cafe": 500,
    "incentivos": 200,
    "asesoria_SCRUM": 10000,
    "CTO_Amazon": 100000,
    "comercial": 1000,
    "campanya_medios": 2000,
    "agencia": 5000,
    "sistema_compresion": 1000
}

document.getElementById("generar_linea").addEventListener("click", escribirLinea);
document.getElementById("vender_lineas").addEventListener("click", venderLineas);
document.getElementById("comprar_minion").addEventListener("click", comprarMinion);
document.getElementById("comprar_minion").addEventListener("click", comenzarAutoclicker);
document.getElementById("ampliar_oficinas").addEventListener("click", ampliarOficinas);
document.getElementById("comprar_disco_duro").addEventListener("click", comprarDiscoDuro);
document.getElementById("contratar_formador").addEventListener("click", contratarFormador);
document.getElementById("comprar_maquina_cafe").addEventListener("click", comprarMaquinaCafe);
let info = document.getElementById("mensajes_info");

let timer;
function comenzarAutoclicker() {
    if (company.minions < 1) {
        console.log("Todavía no hay minions..");
    } else {
        timer = setInterval(escribirLineaAutomatico, company.productividad);
        console.log("comienza el intervalo");
        document.getElementById("comprar_minion").removeEventListener("click", comenzarAutoclicker);
    }
}

function escribirLinea() {
    if (company.lineas + 1 > company.discos_duros * company.capacidad_discos_duros) {
        info.innerText = "Necesitas más discos duros";
    } else {
        company.lineas++;
        document.getElementById("lineas_escritas").innerText = company.lineas;
    }
}

function escribirLineaAutomatico() {
    if (company.lineas + company.minions > company.discos_duros * company.capacidad_discos_duros) {
        info.innerText = "Necesitas más discos duros";
    } else {
        company.lineas += company.minions;
        document.getElementById("lineas_escritas").innerText = company.lineas;
    }
}

function venderLineas() {
    if (company.lineas < 1) {
        info.innerText = "No hay líneas para vender";
    } else {
        company.dinero += company.lineas * company.precio_linea;
        document.getElementById("dinero").innerText = company.dinero.toFixed(2);
        company.lineas = 0;
        document.getElementById("lineas_escritas").innerText = company.lineas;
    }
}

function comprarMinion() {
    if (company.dinero < 10) {
        info.innerText = "No tienes suficiente dinero para comprar un Minion.";
    } else {
        if (company.minions + 1 > company.capacidad_oficinas * company.oficinas) {
            info.innerText = "Límite de minions alcanzado. Compra más oficinas";
        } else {
            company.dinero -= company.coste_minion;
            document.getElementById("dinero").innerText = company.dinero.toFixed(2);
            company.minions++;
            document.getElementById("minions").innerText = company.minions;
        }
    }
}

function ampliarOficinas() {
    if (company.dinero < company.coste_oficina) {
        info.innerText = "No tienes suficiente dinero para ampliar oficinas";
    } else {
        company.dinero -= company.coste_oficina;
        document.getElementById("dinero").innerText = company.dinero.toFixed(2);
        company.oficinas++;
        document.getElementById("oficinas").innerText = company.oficinas;
    }
}

function comprarDiscoDuro() {
    if (company.dinero < company.coste_discos_duros) {
        info.innerText = "No hay suficiente dinero (100EUR)";
    } else {
        company.dinero -= company.coste_discos_duros;
        document.getElementById("dinero").innerText = company.dinero.toFixed(2);
        company.discos_duros++;
    }
}

function cambiarProductividad(valor) {
    company.productividad /= valor;
    clearInterval(timer);
    comenzarAutoclicker();
}

function contratarFormador() {
    if (company.dinero < powerups_costs.formador) {
        info.innerText = "Necesitas más dinero (1000eur)";
    } else {
        company.dinero -= powerups_costs.formador;
        document.getElementById("dinero").innerText = company.dinero.toFixed(2);        
        cambiarProductividad(10);
    }
}

function comprarMaquinaCafe() {
    if (company.dinero < powerups_costs.maquina_cafe) {
        info.innerText = "Necesitas más dinero (1000eur)";
    } else {
        company.dinero -= powerups_costs.maquina_cafe;
        document.getElementById("dinero").innerText = company.dinero.toFixed(2);        
        cambiarProductividad(2);
    }
}