for (var p of document.getElementsByTagName("p")) {
    console.log(p.innerHTML);  
}

for (var p of document.getElementsByClassName("test")) {
    console.log(p.innerHTML);   
}

var pb = document.querySelectorAll("#parrafo2 b");
console.log(pb[0].innerHTML);

for (var p of document.getElementsByClassName("red"))
{
    p.addEventListener("click", function(){
        console.log("Hola Norden");
    });
}

var input = document.getElementById("texto1")
input.addEventListener("keypress", mostrarTexto);
input.addEventListener("dblclick", quitarListener);

function quitarListener() {
    input.removeEventListener("keypress", mostrarTexto);
}

function mostrarTexto(){
    if (event.keyCode == 65 || event.keyCode == 97){
        event.preventDefault();
    }
}
function aumentarNumero(){
    this.innerText++;
}

var cuadrado = document.getElementsByClassName("cuadrado");
for (var p of cuadrado) {
    p.innerText = 0;
    p.addEventListener("click", aumentarNumero);
}

