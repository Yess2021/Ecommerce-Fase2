// -------------------------------------------
//              Importaciones
// -------------------------------------------

import main from "./main.js"

// -------------------------------------------
//           Variables Globales
// -------------------------------------------


// -------------------------------------------
//           Funciones Globales
// -------------------------------------------
function start() {
    console.warn('startContacto')
    main.closeSearch()  // Para cerrar la busquedfa al cargar la pagina
}

// -------------------------------------------
//               Exportacion
// -------------------------------------------

export default {
    start
}