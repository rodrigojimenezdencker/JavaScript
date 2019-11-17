'use strict';
import { getJSON, deleteJSON } from './peticiones.js';

function getStudents() {
    getJSON('http://localhost:55434/api/Alumnoes')
        .then(data => processData(data))
        .catch(error => console.log(error));
}

function deleteStudent(id) {
    deleteJSON('http://localhost:55434/api/Alumnoes/' + id)
        .then(() => { getStudents() })
        .catch(error => console.log(error));
}

function processData(data) {
    let table = document.getElementById('table_body');
    table.innerHTML = "";
    data.forEach(student => {
        let row = document.createElement('tr'),
            student_name = document.createElement('td'),
            student_mark = document.createElement('td'),
            actions = document.createElement('td')
        ;
        student_name.textContent = student.nombre;
        student_mark.textContent = student.nota;
        actions.innerHTML = 
            '<button class="btn btn-primary mr-1 edit_student" id="' + student.id + '">' +
            '<span class="fas fa-user-edit"></span> Edit</button>' +
            '<button class="btn btn-danger delete_student" id="' + student.id + '">' +
            '<span class="fas fa-trash-alt"></span> Delete</button>'
        ;
        row.appendChild(student_name);
        row.appendChild(student_mark);
        row.appendChild(actions);
        table.appendChild(row);
    });
    let edit_buttons = document.getElementsByClassName('edit_student');
    for (let button of edit_buttons) {
        button.addEventListener('click', () => {
            localStorage.idStudentToEdit = button.id;
            window.location.assign('./pages/edit_student.html');
        });
    }
    let delete_buttons = document.getElementsByClassName('delete_student');
    for (let button of delete_buttons) {
        button.addEventListener('click', () => deleteStudent(button.id));
    }
}

window.addEventListener('DOMContentLoaded', getStudents);