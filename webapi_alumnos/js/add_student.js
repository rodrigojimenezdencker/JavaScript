'use strict';
import { postJSON } from './peticiones.js';

function addStudent(student) {
    postJSON('http://localhost:55434/api/Alumnoes', student)
        .then(() => {window.location.assign('../index.html');})
        .catch(error => console.log(error));
}

document.getElementById("button_new_student").addEventListener('click', (e) => {
    e.preventDefault();
    let student = {
        'nombre': document.getElementById('student_name').value,
        'nota': document.getElementById('student_mark').value
    }
    addStudent(student);
});