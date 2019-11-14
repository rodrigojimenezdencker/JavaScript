fetch("http://localhost:55434/api/Alumnoes")
    .then(resp => resp.json())
    .then(data => {
        let table = document.getElementById('table_body');
        table.innerHTML = "";
        for (alumno of data) {
            let row = document.createElement("tr");
            let student_name = document.createElement("td");
            student_name.textContent = alumno.nombre;
            let student_mark = document.createElement("td");
            student_mark.textContent = alumno.nota;
            let actions = document.createElement("td");
            actions.innerHTML = "<button class='btn btn-primary mr-1'>Editar</button><button class='btn btn-danger'>Borrar</button>";    
            row.appendChild(student_name);
            row.appendChild(student_mark);
            row.appendChild(actions);
            table.appendChild(row);
            console.log(alumno.id + "-" + alumno.nombre + "-" + alumno.nota);
        }
    })