"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

//Variables
var carrito = document.querySelector('#carrito');
var contenedorCarrito = document.querySelector('#lista-carrito tbody');
var vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
var listaCursos = document.querySelector('#lista-cursos');
var articulosCarrito = [];
cargarEventListener();

function cargarEventListener() {
  //Cuando agregas un curso presionando "Agregar al carrito"
  listaCursos.addEventListener('click', agregarCurso); //Elimina cursos del carrito

  carrito.addEventListener('click', eliminarCurso); //Muestra los cursos de localstorage

  document.addEventListener('DOMContentLoaded', function () {
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoHTML();
  }); // Vaciar el carrito

  vaciarCarritoBtn.addEventListener('click', function () {
    articulosCarrito = []; //Reseteamos el carrito

    limpiarHTML(); //Elimininamos todo el HTML
  });
} //Funciones


function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains('agregar-carrito')) {
    var cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
} //Elimina un curso del carrito


function eliminarCurso(e) {
  if (e.target.classList.contains('borrar-curso')) {
    var cursiId = e.target.getAttribute('data-id'); //Elimina del arreglo articulosCarrito por el dataId

    articulosCarrito = articulosCarrito.filter(function (curso) {
      return curso.id !== cursiId;
    });
    carritoHTML(); //Iterar sobre el carrito y mostrar su HTML
  }
} // Lee el conenido del HTML el que le dimos click y extrae la información del curso


function leerDatosCurso(curso) {
  //console.log(curso);
  //Crear un objeto con el contenido del curso
  var infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }; //Revisa si un elemento ya existe en el carrito

  var existe = articulosCarrito.some(function (curso) {
    return curso.id === infoCurso.id;
  });

  if (existe) {
    //Actualizar la cantidad
    var cursos = articulosCarrito.map(function (curso) {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //Retorna el onjeto actualizado
      } else {
        return curso; // Retorna los objetos que no son los duplicados
      }
    });
    articulosCarrito = _toConsumableArray(cursos);
  } else {
    //Agregar elementos al arreglo de carrito
    articulosCarrito = [].concat(_toConsumableArray(articulosCarrito), [infoCurso]);
  }

  console.log(articulosCarrito);
  carritoHTML();
} // Muestra el carrito de compras en el html


function carritoHTML() {
  //Limpiar el HTML
  limpiarHTML(); //Recorre el carrito y genera el HTML

  articulosCarrito.forEach(function (curso) {
    var imagen = curso.imagen,
        titulo = curso.titulo,
        precio = curso.precio,
        cantidad = curso.cantidad,
        id = curso.id;
    var row = document.createElement('tr');
    row.innerHTML = "\n            <td>\n                <img src=\"".concat(imagen, "\" width=\"100\">\n            </td>\n            <td>").concat(titulo, "</td>\n            <td>").concat(precio, "</td>\n            <td>").concat(cantidad, "</td>\n            <td>\n                <a href=\"#\" class=\"borrar-curso\" data-id=\"").concat(id, "\" > X </a>\n            </td>\n        "); //Agregar el HTML del carrito en el tbody

    contenedorCarrito.appendChild(row);
  }); //Agregar el carrito de compras al Storage

  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
} //Elimina el los cursos de tbody


function limpiarHTML() {
  //Forma lenta
  //contenedorCarrito.innerHTML = '';
  //Otra forma de eliminar cursos de tbody
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
//# sourceMappingURL=app.dev.js.map
