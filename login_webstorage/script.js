let tareas = [];
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
    "<tr>" +
        "<th>Tarea</th>" +
        "<th>Priodidad</th>" +
        "<th>Fecha</th>" +
        "<th>Acción</th>" +
    "</tr>";
    for (let i = 0; i < tareas.length; i++) {
        document.getElementById("lista").innerHTML += 
        "<tr><td>" + tareas[i].tarea + "</td>" + 
        "<td>" + tareas[i].prioridad + "</td>" + 
        "<td>" + tareas[i].fecha + "</td>" +
        "<td><button id='" + i + "' class='btn btn-danger'>Borrar</button></tr>";
        document.getElementById(i).addEventListener("click",() => eliminarTarea(this.i));
    }
    setLocalStorage();
}

function eliminarTarea(id){
     tareas.splice(id, 1); 
     mostrarLista();
     setLocalStorage();
}


function setLocalStorage() {
    localStorage.array = JSON.stringify(tareas);
}