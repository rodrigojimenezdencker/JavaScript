function cuadrado(lado){
    this.lado = lado;
    this.area = function() {
        return this.lado * this.lado;
    },
    this.perimetro = function() {
        return this.lado * 4;
    }
}

let a = new cuadrado(2);
let b = new cuadrado(4);

console.log(a.area());
console.log(b.area());