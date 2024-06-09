// -------------------------------------------
//               Importacion
// -------------------------------------------
import inicio from "./inicio.js";
import alta from "./alta.js";
import carrito from "./carrito.js";
import contacto from "./contacto.js";
import favoritos from "./favoritos.js";
import nosotros from "./nosotros.js";
import registro from "./registro.js";

// -------------------------------------------
//           Variables Globales
// -------------------------------------------

let barraBuscar = document.getElementById('barra-busqueda');
let inputBuscar = document.getElementById('input-busqueda');
let hamburguer = document.getElementById("hamburger");
let cierraMenu = document.getElementById("closeMenu");  

// -------------------------------------------
//           Funciones Globales
// -------------------------------------------
function cargarPlantilla(id) {

    id = id || 'inicio' 

    const main = document.querySelector('main')
    const url = './plantillas/' + id + '.html'

    const start = {
        inicio: inicio.start,
        alta: alta.start,
        carrito: carrito.start,
        contacto: contacto.start,
        favoritos: favoritos.start,
        nosotros: nosotros.start,
        registro: registro.start,
    }

    const xhr = new XMLHttpRequest()
    xhr.open('get',url)
    xhr.addEventListener('load', () => {
        if (xhr.status == 200) {
            const plantilla = xhr.response

            // Cargamos el código HTML de la plantilla seleccionada
            main.innerHTML = plantilla

            // Cargamos el código JS de la plantilla seleccionada
            start[id]()
        }
    })
    xhr.send()
}

function cargarPlantillas(){
    const links = document.querySelectorAll('header a')

    // --------- carga de la vista de navegación inicial ---------
    const id = location.hash.slice(1)
    cargarPlantilla(id)

     // --------- carga de las vistas de navegación (dinámicas) ---------
    links.forEach(link => { 
        link.addEventListener('click', e => {
            e.preventDefault()
            const id = link.id
            location.hash = id
        })
    })

    // -------- se carga los listeners que aplican a todas las paginas -------------//
    hamburguer.addEventListener('click',showMenu)
    cierraMenu.addEventListener('click',closeMenu)

    const botonBusqueda = document.getElementById('logoBuscar')
    botonBusqueda.addEventListener('click', botonSearch)

    window.addEventListener('hashchange', () => {
        const id = location.hash.slice(1)
        cargarPlantilla(id)
    })
}

function botonSearch() {
    const display = window.getComputedStyle(barraBuscar).getPropertyValue("display");
    if (display === 'none') {
        barraBuscar.style.display = 'flex';
        inputBuscar.focus()
    } else {
        inputBuscar.value = '';
        barraBuscar.style.display = 'none';
    }
}

function closeSearch() {
    const display = window.getComputedStyle(barraBuscar).getPropertyValue("display"); // Para cerrar la busquedfa al cargar la pagina
    inputBuscar.value = '';
    barraBuscar.style.display = 'none';

}

const overlay = document.getElementById('overlay');

function showMenu() {
    overlay.style.display = 'block';
    
}

function closeMenu() {
    overlay.style.display = 'none';
}

function startMain() {  
    cargarPlantillas()
}

// -------------------------------------------
//               Ejecución
// -------------------------------------------

window.onload = startMain


export default{
    showMenu,
    closeMenu,
    closeSearch,
    botonSearch
}


