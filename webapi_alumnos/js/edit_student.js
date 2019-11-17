'use strict';
import { getJSON, putJSON } from './../js/peticiones.js';

window.addEventListener('DOMContentLoaded', () => getStudentById(localStorage.idStudentToEdit));

function getStudentById(id) {
    getJSON('http://localhost:55434/api/Alumnoes/' + id)
        .then(data => processData(data))
        .catch(error => console.log(error));
}

function editStudent(id, object) {
    putJSON('http://localhost:55434/api/Alumnoes/' + id, object)
        .then(() => window.location.assign('../index.html'))
        .catch(error => console.log(error));
}

function processData(data) {
    document.getElementById('student_name').value = data.nombre;
    document.getElementById('student_mark').value = data.nota;
    document.getElementById('button_edit_student').addEventListener('click', (e) => {
        e.preventDefault();
        let editedStudent = {
            'id': localStorage.idStudentToEdit,
            'nombre': document.getElementById('student_name').value,
            'nota': document.getElementById('student_mark').value
        }
        editStudent(localStorage.idStudentToEdit, editedStudent);
    })
}