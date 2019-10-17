let cajaTexto = document.getElementById("texto");
cajaTexto.addEventListener("keyup", mostrarInfo);

function mostrarInfo(){
    document.getElementById("caracteres").innerText = cajaTexto.value.length;
    document.getElementById("letras").innerText = cajaTexto.value.replace(/\s/g,'').length;
    let palabras = cajaTexto.value.split(" ");
    if (cajaTexto.value.length == 0){
        document.getElementById("palabras").innerText = 0;
    } else {
        document.getElementById("palabras").innerText = palabras.filter((e) => e.length > 0).length;
    }
}

