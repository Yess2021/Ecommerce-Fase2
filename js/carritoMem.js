// -------------------------------------------
//              Importaciones
// -------------------------------------------

import carritoLocalStorage from "./carritoLocalStorage.js"
import inicio from "./inicio.js"
//-----------------------------------------------------
//             Variables globales 
//-----------------------------------------------------
let carrito = []
let counter = 0

const get = id => {
    carritoLocalStorage.guardar(carrito)
    return carrito.find(p => p.id == id)
}

const clear = _ => {
    carrito = []
    carritoLocalStorage.guardar(carrito)

}

const getAll = () => {
    carrito = carritoLocalStorage.leer("carrito")
    return carrito
}

const contadorCarritoElement = document.getElementById("contadorCarrito")

const updateCounter = () => {
    let counter = 0
    carrito.forEach(producto => {
        counter += producto.datosCompra[0].cantidad.reduce((acc, curr) => acc + curr, 0);
    })
    contadorCarritoElement.innerHTML = counter
    if(counter === 0){
        contadorCarritoElement.style.display = "none"    
    } else {
        contadorCarritoElement.style.display = "flex"
    }
}

const guardar = prod => {
    carrito.push(prod)
    carritoLocalStorage.guardar(carrito)
    console.log(carrito)
    updateCounter()
}

const actualizar = (id, prod) => {
    const index = carrito.findIndex(p => p.id == id)
    carrito.splice(index, 1, prod)
    carritoLocalStorage.guardar(carrito)
    updateCounter()
}

const eliminar = id => {
    const index = carrito.findIndex(p => p.id == id)
    carrito.splice(index, 1)
    carritoLocalStorage.guardar(carrito)
    updateCounter()
}


// -------------------------------------------
//               Exportacion
// -------------------------------------------

export default {
    get,
    clear,
    getAll,
    guardar,
    actualizar,
    eliminar
}