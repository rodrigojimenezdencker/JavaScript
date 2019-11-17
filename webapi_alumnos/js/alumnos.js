import { getJSON, postJSON, putJSON, deleteJSON } from './peticiones.js';
let host = window.location.host;
console.log(host);

function getStudents() {
    getJSON("http://localhost:55434/api/Alumnoes")
        .then(data => procesar(data))
        .catch(error => console.log(error));
}

function addStudent(student) {
    postJSON("http://localhost:55434/api/Alumnoes", student)
        .then(() => {window.location.assign("http://" + host + "/index.html");})
        .catch(error => console.log(error));
}

function deleteStudent(id) {
    deleteJSON("http://localhost:55434/api/Alumnoes/" + id)
        .then(() => { getStudents()})
        .catch(error => console.log(error));
}

function editStudent(id) {
    putJSON("http://localhost:55434/api/Alumnoes/" + id)
        .then(data => {window.location.assign("http://" + host + "/pages/edit_student.html");})
        .catch(error => console.log(error));
}

function procesar(datos) {
    let table = document.getElementById('table_body');
    table.innerHTML = "";
    datos.forEach(student => {
        let row = document.createElement("tr");
        let student_name = document.createElement("td");
        student_name.textContent = student.nombre;
        let student_mark = document.createElement("td");
        student_mark.textContent = student.nota;
        let actions = document.createElement("td");
        actions.innerHTML = "<button class='btn btn-primary mr-1 edit_student' id='" + student.id + "'>Editar</button><button class='btn btn-danger delete_student' id='" + student.id + "'>Borrar</button>";
        row.appendChild(student_name);
        row.appendChild(student_mark);
        row.appendChild(actions);
        table.appendChild(row);
    });
    let edit_buttons = document.getElementsByClassName('edit_student');
    for (let button of edit_buttons) {
        button.addEventListener("click", () => {
            localStorage.idStudentToEdit = button.id;
            window.location.assign("http://" + host + "/pages/edit_student.html");
        });
    }
    let delete_buttons = document.getElementsByClassName("delete_student");
    for (let button of delete_buttons) {
        button.addEventListener("click", () => {
            deleteStudent(button.id);
        });
    }
}

if (document.getElementById("button_new_student") != null) {
    document.getElementById("button_new_student").addEventListener("click", (e) => e.preventDefault());
    document.getElementById("button_new_student").addEventListener("click", function() {
        let student = {     
            "nombre": document.getElementById("student_name").value,
            "nota": document.getElementById("student_mark").value
        }
        addStudent(student);
    });
}

if (document.URL.includes("index.html")) {
    getStudents();
}