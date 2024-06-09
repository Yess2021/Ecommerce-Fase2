//-----------------------------------------------------
//             Variables globales 
//-----------------------------------------------------

const guardar = (favorito) => {  
    localStorage.setItem("favorito", JSON.stringify(favorito))}

const leer = ()=> {
    try {
        let j= JSON.parse(localStorage.getItem("favorito")) || []

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