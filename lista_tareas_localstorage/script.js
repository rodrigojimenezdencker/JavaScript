let tareas = [];
iniciar();
document.getElementById("boton_guardar").addEventListener("click", guardarDatos);

function guardarDatos(){
    let tarea = document.getElementById("tarea").value;
    let prioridad = document.getElementById("prioridad").value;
    let fecha = document.getElementById("fecha_vencimiento").value;
    
    tareas.push(
        {
        "tarea": tarea,
        "prioridad": prioridad,
        "fecha": fecha
        }
    );
    mostrarLista();
}

function mostrarLista(){
    document.getElementById("lista").innerHTML = "";
    document.getElementById("lista").innerHTML = 
    "<thead><tr>" +
        "<th>Tarea</th>" +
        "<th>Priodidad</th>" +
        "<th>Fecha</th>" +
        "<th>Acción</th>" +
    "</tr></thead>" +
    "<tbody id='body_table'></tbody>";
    for (let i = 0; i < tareas.length; i++) {
        document.getElementById("body_table").innerHTML += 
        "<tr><td>" + tareas[i].tarea + "</td>" + 
        "<td>" + tareas[i].prioridad + "</td>" + 
        "<td>" + tareas[i].fecha + "</td>" +
        "<td><button id='" + i + "' class='boton_borrar btn btn-danger'>Borrar</button></tr>";
    }
    let botones = document.getElementsByClassName("boton_borrar");
    for (let i = 0; i < botones.length; i++){
        botones[i].addEventListener("click", () => eliminarTarea(i));
    }
    setLocalStorage();
}

function eliminarTarea(id){
    console.log(id);
     tareas.splice(id, 1); 
     mostrarLista();
     setLocalStorage();
}

function setLocalStorage() {
    localStorage.array = JSON.stringify(tareas);
}

function iniciar() {
    if (localStorage.array) {
        tareas = JSON.parse(localStorage.array);
    }
    mostrarLista();
}