
// -------------------------------------------
//               Importacion
// -------------------------------------------

import productosMem from "./productosMem.js";
import servicioProductos from "./servicioProductos.js";
import carritoMem from "./carritoMem.js";
import favoritos from "./favoritos.js";
import carrito from "./carrito.js";
import alta from "./alta.js";
import main from "./main.js";

// -------------------------------------------
//           Variables Globales
// -------------------------------------------
let tallas = alta.funTallas()
let seleccionado = []

let talla = [];
let tallaIndex = [];
let color = [];
let colorIndex = [];
let cantidad = []

// -------------------------------------------
//           Funciones Globales
// -------------------------------------------

function render() {

    //localStorage.clear();

    const listaFavoritos = favoritos.lista()

    let cards = ''

    const productosFull = productosMem.getAll()

    const inputBuscar = document.getElementById('input-busqueda');
    const filtro = inputBuscar.value

    const productos = productosFull.filter(producto => producto.nombre.toLowerCase().includes(filtro.toLowerCase()))

    let arrayColores = [[], [], []];

    if (productos.length) {

        for (let i = 0; i < productos.length; i++) {
            arrayColores = productos[i].colores

            // Se agrega Existencia y Color para saber que colores y stock hay en existencia
            let existencia = stockExistencia(productos[i].stock, "stock")
            let colores = stockExistencia(productos[i].stock, arrayColores)

            cards += `<section class="card-container" id="cc-${productos[i].id}"> 
                        <img src="${productos[i].foto}"> 
                        <button class="favoritosIcon" id="agregarFavoritos-${productos[i].nombre}" value='${productos[i].nombre}' > 
                        <img id="img-${productos[i].nombre}" src= "${(listaFavoritos.includes(productos[i].nombre) ? 'Icons/favorite-checked.svg' : 'Icons/favorite.svg')}" />
                        </button>
                        <h4>${productos[i].nombre}</h4>
                        <p>${productos[i].detalles}</p>
                        <p> $${productos[i].precio.toLocaleString()}</p>
                        <p class="tallasContainer">`
            // Se agrega para que las tallas que no estan en exixtencia aparezcan con opacidad del 35%
            tallas.forEach((valor) => {
                cards += (existencia.includes(valor)) ?
                    `<label class="tallas tallaSeleccionar" id="${productos[i].id + "," + valor}"> ${valor}</label>`
                    : `<label class="tallas" id="${productos[i].id + "," + valor}" style="opacity:35%">  ${valor + " "}</label>`
            })
            cards += `</p><div class="colores-container">`

            arrayColores[0].forEach((valor, index) => {
                cards += (colores.includes(valor)) ?
                    `<div class="colores" id="${productos[i].id + "," + index}" style="background-color: ${valor}"></div>`
                    : `<div class="colores" id="${productos[i].id + "," + index}" style="opacity:10%; background-color: ${valor}"></div>`
            })

            cards += '</div>'
            cards += `<button id="btnComprar-${productos[i].id}" disabled>Agregar al Carrito</button></section>`

        }
    }
    else cards += '<h2 class="msg-error">No se encontraron productos para mostrar</h2>'

    document.querySelector('.section-cards-container').innerHTML = cards


}

const agregarFav = favoritos.agregarFav
//const borrarFav=favoritos.borrarFav

const alertElement = document.getElementById("alert")


function mostrarAlert(mensaje, tiempo) {
    alertElement.innerHTML = mensaje
    alertElement.style.right = "20px"
    alertElement.style.opacity = "1"
    setTimeout(() => {
        alertElement.style.right = "-300px"
        alertElement.style.opacity = "0"
    }, tiempo * 1000)
}

function setListeners() {
    const botonesComprar = document.querySelectorAll('.inicio section button[id^="btnComprar-"]')

    botonesComprar.forEach(boton => {
        boton.addEventListener('click', () => {
            boton.disabled = true
            const id = boton.id.split('-')[1]

            const producto = productosMem.get(id)

            mostrarAlert("Se agregó el producto", 2)

            if (!carrito.agregar(producto, seleccionado[0])) boton.disabled = true
            seleccionado = []
        })
    })

    const botonFavorito = document.getElementsByClassName('favoritosIcon') // Para marcar o desmarcar favoritos 

    for (let item = 0; item < botonFavorito.length; item++) {
        botonFavorito[item].addEventListener('click', () => {
            let id = 'img-' + botonFavorito[item].value
            console.log(document.getElementById(id).src.split('/')[4])
            if (document.getElementById(id).src.split('/')[4] != "favorite-checked.svg") {
                favoritos.agregarFav(botonFavorito[item].value)

                document.getElementById(id).src = "Icons/favorite-checked.svg"
            } else {
                favoritos.borrarFav(botonFavorito[item].value);

                document.getElementById(id).src = "Icons/favorite.svg";
            }
        })
    }

    const labelCompra = document.getElementsByClassName("tallaSeleccionar") // Para seleccionar las tallas en existencia
    for (let item = 0; item < labelCompra.length; item++) {

        labelCompra[item].addEventListener("click", () => {

            let datos = labelCompra[item].id.split(",")
            const producto = productosMem.get(datos[0])
            let index = tallas.indexOf(datos[1])

            let stockTallas = producto.stock[index]

            stockTallas.forEach((valor, indice) => {
                document.getElementById(datos[0] + ',' + tallas[indice]).style.fontWeight = (indice != index) ? "normal" : "bold"
            })
            let elementoPadre = document.getElementById(datos[0] + "," + index)

            // Se muestran los los colores de la talla seleccionada
            let ArrayColores = stockExistencia(producto.stock, producto.colores, index)
            let cards = ''
            producto.colores[index].forEach((valor, iter) => {
                cards += (ArrayColores.includes(valor)) ?
                    `<div class="colores coloresSeleccionar" id="${producto.id + "," + iter}" style="background-color: ${valor}"></div>`
                    : `<div class="colores" id="${producto.id + "," + iter}" style="opacity:10%; background-color: ${valor}"></div>`
            })
            elementoPadre.parentElement.innerHTML = cards

            const colorSeleccionado = document.getElementsByClassName('colores coloresSeleccionar')
            for (let item = 0; item < colorSeleccionado.length; item++) {

                colorSeleccionado[item].addEventListener('click', () => {
                    let indiceColor = colorSeleccionado[item].id.split(',')[1]

                    talla = tallas[index]
                    tallaIndex = index
                    color = producto.colores[index][indiceColor]
                    colorIndex = indiceColor
                    cantidad = 1

                    let element = {
                        //id:producto.id, comentado 02/06
                        talla: talla,
                        tallaIndex: tallaIndex,
                        color: color,
                        colorIndex: colorIndex,
                        cantidad: cantidad
                    }

                    seleccionado.push(element)
                    document.getElementById('btnComprar-' + datos[0]).disabled = false  // Se habilita el boton comprar 
                    document.getElementById("cc-" + datos[0]).onmouseleave = () => {
                        seleccionado = []
                        /*  talla=[]
                         tallaIndex=[]
                         color=[]
                         colorIndex=[]
                         cantidadTC=[]
                         cantidad=[]*/
                    }//parra borrar lo seleccionado se agrega 25/05 /////////////////////////
                })
            }
        })
    }
    const buscarButton = document.getElementById("buscar")
    buscarButton.addEventListener("click", () => render())
}


function stockExistencia(stock, tipo, indice = "no") {

    // Esta funcion es para saber que talles hay existencia y los colores de esos talles
    if (tipo == "stock" && typeof stock == "number") return stock; // Si stock no es un array de cantidades regresa el numero
    let arrayStock = [];
    let colores = [];
    let talle = 1;
    const ind = indice
    // Incluimos los stocks que tienen exixtencia de algun color

    for (let i = 0; i < stock.length; i++) {
        if (stock[i][0] + stock[i][1] + stock[i][2] > 0)
            arrayStock.push(tallas[talle - 1]); 
        talle++;
    }
    if (tipo == "stock") return arrayStock; // Regresamos los talles en existencia como array quite   .join("   ")

    if (typeof stock == "number") return tipo; // Para que forEach funcione el stock debe ser un array de numeros

    if (indice == "no") {
        stock.forEach(revisa);
    } else {
        stock[indice].forEach(revisa);
    }
    //stock.forEach(revisa) -- Se quitan los colores que estan repetidos

    function revisa(valor, index) {
        // se modifica 23/05
        if ((ind == "no")) {
            for (let i = 0; i < valor.length; i++) {
                if (valor[i] > 0) {
                    if (!colores.includes(tipo[index][i])) colores.push(tipo[index][i]);
                }
            }
        }
        else {
            if (valor > 0) {
                if (!colores.includes(tipo[ind][index])) colores.push(tipo[ind][index]);
            }

        }
    }

    return colores;
}

async function start() {
    console.warn('startInicio')

    const productos = await servicioProductos.getAll()

    productosMem.set(productos)

    //representarCardsProductos()
    render()
    setListeners()
    main.closeSearch()  // Para cerrar la barra de busqueda al cargar la pagina

}

// -------------------------------------------
//               Ejecución
// -------------------------------------------


// -------------------------------------------
//               Exportacion
// -------------------------------------------

export default {
    start,
    stockExistencia,
    mostrarAlert
}