// -------------------------------------------
//              Importaciones
// -------------------------------------------
import favoritoLocalStorage from "./favoritoLocalStorage.js"

//-----------------------------------------------------
//             Variables globales 
//-----------------------------------------------------
let favorito = []

const clear = _ => {
    favorito = []
    favoritoLocalStorage.guardar(favorito)  
}

const getAll = () => { 
    favorito = favoritoLocalStorage.leer()
    return favorito
}

const guardar = prod => {
    favorito.push(prod)
    favoritoLocalStorage.guardar(favorito)
}

const eliminar = nombre => {
    const index = favorito.findIndex(p => p == nombre)
    favorito.splice(index,1)
    favoritoLocalStorage.guardar(favorito)
}

// -------------------------------------------
//               Exportacion
// -------------------------------------------

export default {
    clear,
    getAll,
    guardar,
    eliminar
}