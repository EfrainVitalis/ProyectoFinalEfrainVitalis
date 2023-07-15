console.table(libros);
let carro = JSON.parse(localStorage.getItem("carro")) || [];
let contenedorLib = document.getElementById("mislibros");
let tablaBody = document.getElementById("tablabody");
const btnFinalizarCompra = document.getElementById("btn-finalizar-compra");
let totalCarrito = 0;
let preciosArticulos = [];
let cantidadCompras = 0;
let totalPrecio = 0; // INICIO TOTAL PRECIO

// tarjetas con las imagenes
function renderizarLibros(listaLibros) {
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
    // Evento
    boton.onmouseover = () => {
      boton.classList.replace("btn-primary", "btn-warning");
    };
    boton.onmouseout = () => {
      boton.classList.replace("btn-warning", "btn-primary");
    };
  }
}

renderizarLibros(libros);

// Carrito

function agregarACarrito(libro) {
  carro.push(libro);
  mostrarCarrito();
  Swal.fire({
    title: "Hola hola 😉",
    text: `Agregaste ${libro.titulo} felicitaciones!!`,
    imageUrl: `${libro.image}`,
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: "Custom image",
  });
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
  totalPrecio = 0; // ANTES DE RECORRER EL ARRAY  PONGO EL PRECIO EN 0 PARA Q NO SE REPITA INFO
  cantidadCompras = 0; //ANTES DE RECCORER EL ARRAY PONGO LA CANTIDAD EN 0 PARA Q NO SE REPITA INFO
  tablaBody.innerHTML = "";
  carro.forEach((element) => {
    //RECORRO EL ARRAY Y AGREGO UN LIBRO POR CADA ELEMENTO EN EL ARRAY
    totalPrecio += element.precio;
    cantidadCompras++;
    tablaBody.innerHTML += `
        <tr>
            <td>${element.titulo}</td>
            <td>${element.precio}</td>
            <td>${element.codigo}</td>
            <td><span class ="eliminar-libro"style="cursor: pointer">❌</span></td>
        </tr>
        
    `;
  });

  actualizarTotalPrecio();
  actualizarCompras(); //AGREGO ESTA FUNCION DENTRO DE LA FUNCION AGREGAR AL CARRITO ASI CADA VEZ Q AGREGO ALGO AL CARRITO HAGO TODO JUNTO
  // aca introdusco el storage
  localStorage.setItem("carro", JSON.stringify(carro));

  // elimiar un libro del carro
  tablaBody.querySelectorAll(".eliminar-libro").forEach((span, index) => {
    span.addEventListener("click", () => {
      eliminarProducto(index);
    });
  });
  function eliminarProducto(index) {
    carro.splice(index, 1); // Elimina el elemento del array en el índice especificado
    mostrarCarrito(); // Vuelve a mostrar el carrito actualizado en la tabla
  }
}

window.addEventListener("load", () => {
  //actualizarCompras(); LO PONGO DIRECTAMENTE DENTRO DE LA FUNCION AGREGAR AL CARRITO
  mostrarCarrito();
});

btnFinalizarCompra.addEventListener("click", finalizarCompra);
function finalizarCompra() {
  limpiarCarrito();
  mostrarMensajeConfirmacion();
  function limpiarCarrito() {
    carro = []; // Limpia el array del carrito
    mostrarCarrito(); // Vuelve a mostrar el carrito actualizado en la tabla
  }
  function mostrarMensajeConfirmacion() {
    // mensaje de confirmacion
    Swal.fire({
      title: "¡Compra exitosa!",
      text: "Gracias por tu compra",
      icon: "success",
    }).then(() => {
      // Redirige al usuario a la página principal
      window.location.href = "index.html";
    });
  }
}
function obtenerDolar() {
  const URLDOLAR = "https://api.bluelytics.com.ar/v2/latest";
  fetch(URLDOLAR)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      console.log(datos);
      const cotizacionesBlue = datos.blue;
      document.getElementById(
        "formulario"
      ).innerText = `Dolar compra: ${cotizacionesBlue.value_buy} - Dolar venta: ${cotizacionesBlue.value_sell}`;
    });
}

obtenerDolar();

// Aqui vamos a filtrar los precios para seleccionar los productos filtrados y poder borrar los filtros con el boton borrar

let filtro = document.getElementById("filtro");
let limpiar = document.getElementById("borro");
let min = document.getElementById("min");
let max = document.getElementById("max");

function filtrarPorPrecio(precioMin, precioMax) {
  const filtrados = libros.filter(
    (libro) => libro.precio >= precioMin && libro.precio <= precioMax
  );
  sessionStorage.setItem("filtrados", JSON.stringify(filtrados));
  return filtrados;
}

function limpiarFiltros() {
  sessionStorage.removeItem("filtrados");
  min.value = "";
  max.value = "";
  renderizarLibros(libros);
}

filtro.onclick = () => {
  console.log("click");
  console.log(min.value, max.value);
  if (min.value != "" && max.value != "" && min.value < max.value) {
    let listaFiltrados = filtrarPorPrecio(min.value, max.value);
    console.log(listaFiltrados);
    renderizarLibros(listaFiltrados);
  }
};

limpiar.onclick = () => {
  limpiarFiltros();
};
