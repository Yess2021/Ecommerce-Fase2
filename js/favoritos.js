// -------------------------------------------
//               Importacion
// -------------------------------------------
import productosMem from "./productosMem.js";
import servicioProductos from "./servicioProductos.js";
import main from "./main.js";
import favoritoMem from "./favoritoMem.js";
import alta from "./alta.js";
import inicio from "./inicio.js";

// -------------------------------------------
//           Variables Globales
// -------------------------------------------

let listaFavoritos = favoritoMem.getAll() 
let tallas = alta.funTallas()  

// -------------------------------------------
//           Funciones Globales
// -------------------------------------------
function representarCardsFavoritos() {
const productos = productosMem.getAll()

    let cards = ''
    console.log(listaFavoritos)
    if(listaFavoritos.length) {
        console.log(listaFavoritos.length)
        for(let i=0; i<listaFavoritos.length; i++) {

            const producto = productos.find(producto => producto.nombre === listaFavoritos[i])
            console.log(producto)
            let arrayColores = producto.colores// agregado 06/06
            let existencia = inicio.stockExistencia(producto.stock, "stock") // agregado 06/06
            let colores = inicio.stockExistencia(producto.stock, arrayColores)// agregado 06/06
            cards += '<section class="card-container">'+
                        '<img  class="foto" src="' + producto.foto + '">' +
                        '<button class="favoritosIcon">' + 
                        '<img src="Icons/favorite-checked.svg" />' + 
                        '</button>' +
                        '<h4>' + producto.nombre + '</h4>' +
                        '<p>' + producto.detalles + '</p>' +
                        '<p> $' + producto.precio + '</p>'// +   se modifica 06/06
                       // '<p> Talles ' + producto.stock + '</p>' +  se modifica 06/06
            tallas.forEach((valor) => { 
                        cards += (existencia.includes(valor)) ?
                            `<label id="${producto.id + "," + valor}" class="tallaSeleccionar">  ${valor}</label>`
                            : `<label id="${productos.id + "," + valor}" style="opacity:35%">  ${valor + " "}</label>`
                    })
            cards += `</p><div class="colores-container">`
            arrayColores[0].forEach((valor, index) => {                           
                cards += (colores.includes(valor)) ?
                    `<div class="colores" id="${producto.id + "," + index}" style="background-color: ${valor}"></div>`
                    : `<div class="colores" id="${producto.id + "," + index}" style="opacity:10%; background-color: ${valor}"></div>`
            })

            cards += '</div></section>'

        }
    }
    else cards += '<h2 class="msg-error">No tienes favoritos para mostrar</h2>'

    document.querySelector('.section-cards-container').innerHTML = cards 
}

function agregarFav(nombre) {  // Para guardar favoritos en local storage 
    function filtrar(favorito){
        return favorito !== nombre
    }

    console.log(nombre)
    if(!listaFavoritos.includes(nombre)){
        favoritoMem.guardar(nombre)

    } else {
        listaFavoritos = listaFavoritos.filter(filtrar)
    }
    listaFavoritos = favoritoMem.getAll() 
    console.log("lista actualizada", listaFavoritos)
    

}

function borrarFav(nombre){  // Para borrar favorito 
    favoritoMem.eliminar(nombre)
    listaFavoritos = favoritoMem.getAll() 
}

const lista = () => listaFavoritos 



async function start() {
    console.warn('startFavoritos')
    const productos = await servicioProductos.getAll()

    productosMem.set(productos)
    main.closeSearch()  
    representarCardsFavoritos()
}


// -------------------------------------------
//               Ejecución
// -------------------------------------------

 
// -------------------------------------------
//               Exportacion
// -------------------------------------------

export default {
    start,
    lista,
    agregarFav,
    borrarFav 
}