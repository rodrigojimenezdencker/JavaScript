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
document.getElementById("contratar_formador").addEventListener("click", () => comprarPowerUp(powerups_costs.formador, 10, "contratar_formador"));
document.getElementById("comprar_maquina_cafe").addEventListener("click", () => comprarPowerUp(powerups_costs.maquina_cafe, 2, "comprar_maquina_cafe"));
document.getElementById("comprar_incentivos").addEventListener("click", () => comprarPowerUp(powerups_costs.incentivos, 10));

let info = document.getElementById("mensajes_info");

function actualizarDinero(dinero) {
    company.dinero += dinero;
    document.getElementById("dinero").innerText = company.dinero.toFixed(2);
}

let timer;
function comenzarAutoclicker() {
    if (company.minions > 0) {
        timer = setInterval(escribirLineaAutomatico, company.productividad);
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
        actualizarDinero(company.lineas * company.precio_linea);
        company.lineas = 0;
        document.getElementById("lineas_escritas").innerText = company.lineas;
    }
}

let powerUpEspecialesActivados = false;
function comprarMinion() {
    if (company.dinero < 10) {
        info.innerText = "No tienes suficiente dinero para comprar un Minion.";
    } else {
        if (company.minions + 1 > company.capacidad_oficinas * company.oficinas) {
            info.innerText = "Límite de minions alcanzado. Compra más oficinas";
        } else {
            actualizarDinero(-company.coste_minion);
            company.minions++;
            document.getElementById("minions").innerText = company.minions;
            if (company.minions > 500 && powerUpEspecialesActivados == false) {
                activarPowerUpEspeciales();
                powerUpEspecialesActivados = true;  
            }
        }
    }
}

function activarPowerUpEspeciales() {
    document.getElementById("asesoria_SCRUM").addEventListener("click", () => comprarPowerUp(powerups_costs.asesoria_SCRUM, 4, "asesoria_SCRUM"));
    document.getElementById("asesoria_SCRUM").disabled = false;
    document.getElementById("contratar_CTO_amazon").addEventListener("click", () => comprarPowerUp(powerups_costs.CTO_Amazon, 50, "contratar_CTO_amazon"));
    document.getElementById("contratar_CTO_amazon").disabled = false;
    document.getElementById("contratar_comercial").addEventListener("click", () => comprarPowerUp(powerups_costs.comercial, 2, "contratar_comercial")); 
    document.getElementById("contratar_comercial").disabled = false;  
    document.getElementById("contratar_campanya_medios").addEventListener("click", () => comprarPowerUp(powerups_costs.campanya_medios, 2, "contratar_campanya_medios"));
    document.getElementById("contratar_campanya_medios").disabled = false;   
    document.getElementById("contratar_agencia").addEventListener("click", () => comprarPowerUp(powerups_costs.agencia, 2, "contratar_agencia"));
    document.getElementById("contratar_agencia").disabled = false;
    document.getElementById("comprar_sistema_compresion").addEventListener("click", () => comprarPowerUp(powerups_costs.sistema_compresion, 2, "comprar_sistema_compresion"));  
    document.getElementById("comprar_sistema_compresion").disabled = false;
}

function ampliarOficinas() {
    if (company.dinero < company.coste_oficina) {
        info.innerText = "No tienes suficiente dinero para ampliar oficinas";
    } else {
        actualizarDinero(-company.coste_oficina);
        company.oficinas++;
        document.getElementById("oficinas").innerText = company.oficinas;
    }
}

function comprarDiscoDuro() {
    if (company.dinero < company.coste_discos_duros) {
        info.innerText = "No hay suficiente dinero (100 EUR)";
    } else {
        actualizarDinero(-company.coste_discos_duros);
        company.discos_duros++;
    }
}

function comprarPowerUp(powerup, aumentoProductividad, id) {
    if (company.dinero < powerup) {
        info.innerText = "Necesitas más dinero: " + powerup;
    } else {
        if (powerup == powerups_costs.incentivos) {
            powerups_costs.incentivos *= 2;
        }
        actualizarDinero(-powerup);
        cambiarProductividad(aumentoProductividad);
        if (id !== undefined) {
            document.getElementById(id).disabled = true;
        }
    }
}

function cambiarProductividad(valor) {
    company.productividad /= valor;
    clearInterval(timer);
    comenzarAutoclicker();
}