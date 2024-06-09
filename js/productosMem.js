//-----------------------------------------------------
//             Variables globales 
//-----------------------------------------------------
let productos = []

const set = prods => productos = prods

const get = id => productos.find(p => p.id == id)

const getAll = () => productos

const guardar = prod => productos.push(prod)

const actualizar = (id, prod) => {
    const index = productos.findIndex(p => p.id == id)
    productos.splice(index,1, prod)
} 

const eliminar = id => {
    const index = productos.findIndex(p => p.id == id)
    productos.splice(index,1)
}


// -------------------------------------------
//               Exportacion
// -------------------------------------------

export default {
    set,
    get,
    getAll,
    guardar,
    actualizar,
    eliminar
}