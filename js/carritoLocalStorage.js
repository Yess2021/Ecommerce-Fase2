//-----------------------------------------------------
//             Variables globales 
//-----------------------------------------------------

const guardar = (carrito) => {
    localStorage.setItem("carrito", JSON.stringify(carrito))}

const leer = ()=> {
    try {
        let j= JSON.parse(localStorage.getItem("carrito")) || []

    return j
    }
    catch {
        return []
    }
}


// -------------------------------------------
//               Exportacion
// -------------------------------------------

export default {
    guardar,
    leer
    //aComprar
}