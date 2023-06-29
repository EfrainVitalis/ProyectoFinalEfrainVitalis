console.table(libros);
let carro = JSON.parse(localStorage.getItem("carro")) || [];
let contenedorLib = document.getElementById("mislibros");
let tablaBody = document.getElementById("tablabody");
let totalCarrito = 0;
let preciosArticulos = [];
let cantidadCompras = 0;
let totalPrecio = 0; // INICIO TOTAL PRECIO

// tarjetas con las imagenes
function rendenrizarLibros(listaLibros) {
  contenedorLib.innerHTML = "";
  for (const libro of listaLibros) {
    contenedorLib.innerHTML += `
        <div class="card col-sm-3">
                <img class="card-img-top" src=${libro.image} alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${libro.titulo}</h5>
                    <p class="card-text">$ ${libro.precio}</p>
                    <button id=${libro.codigo} class="btn btn-primary compra">Comprar</button>
                </div>
            </div>
        `;
  }
  let botones = document.getElementsByClassName("compra");
  for (const boton of botones) {
    boton.addEventListener("click", () => {
      const libroACarro = libros.find((libro) => libro.codigo == boton.id);
      agregarACarrito(libroACarro);
    });
  }
}
rendenrizarLibros(libros);
// Carrito

function agregarACarrito(libro) {
  let total = carro.reduce((acumulador, libro) => acumulador + libro.precio, 0);
  carro.push(libro);
  mostrarCarrito();
}

function actualizarTotalPrecio() {
  const totalDeTodo = document.getElementById("total");
  totalDeTodo.innerHTML = "Precio total $:" + totalPrecio;
}
// aca le agrego el contador abajo del carrito
const botonCompra = document.getElementById("carrito de compras");

botonCompra.addEventListener("click", () => {});
function actualizarCompras() {
  const elementoCompras = document.getElementById("compras");
  elementoCompras.textContent = `📚: ${cantidadCompras}`;
}

function mostrarCarrito() {
  tablaBody.innerHTML = "";
  totalPrecio = 0; // ANTES DE RECORRER EL ARRAY  PONGO EL PRECIO EN 0 PARA Q NO SE REPITA INFO
  cantidadCompras = 0; //ANTES DE RECCORER EL ARRAY PONGO LA CANTIDAD EN 0 PARA Q NO SE REPITA INFO
  carro.forEach((element) => {
    //RECORRO EL ARRAY Y AGREGO UN LIBRO POR CADA ELEMENTO EN EL ARRAY
    totalPrecio += element.precio;
    cantidadCompras++;
    tablaBody.innerHTML += `
        <tr>
            <td>${element.titulo}</td>
            <td>${element.precio}</td>
            <td>${element.codigo}</td>
        </tr>
    `;
  });

  actualizarTotalPrecio();
  actualizarCompras(); //AGREGO ESTA FUNCION DENTRO DE LA FUNCION AGREGAR AL CARRITO ASI CADA VEZ Q AGREGO ALGO AL CARRITO HAGO TODO JUNTO
  // aca introdusco el storage
  localStorage.setItem("carro", JSON.stringify(carro));
}
window.addEventListener("load", () => {
  //actualizarCompras(); LO PONGO DIRECTAMENTE DENTRO DE LA FUNCION AGREGAR AL CARRITO
  mostrarCarrito();
});
