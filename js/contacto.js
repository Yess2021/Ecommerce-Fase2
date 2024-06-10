// -------------------------------------------
//              Importaciones
// -------------------------------------------
import main from "./main.js"
import carritoMem from "./carritoMem.js"

// -------------------------------------------
//           Variables Globales
// -------------------------------------------

// -------------------------------------------
//           Funciones Globales
// -------------------------------------------

function setListeners() {

    const inputNombreCont = document.getElementById("nombre-contacto")
    const errorNombreCont = document.getElementById("error-nombre-contacto")

    inputNombreCont.addEventListener('blur', () => {
        if(inputNombreCont.value.length === 0){
            errorNombreCont.innerHTML = "El campo no puede estar vacío"
        }
        if(inputNombreCont.value.length < 5){
            errorNombreCont.innerHTML = "El nombre debe tener mas de 5 caracteres"
        }
    })
    inputNombreCont.addEventListener('input', () => {
            errorNombreCont.innerHTML = ""
    })

   const inputEmail = document.getElementById("email-contacto")
    const errorEmail = document.getElementById("error-email-contacto")

    inputEmail.addEventListener('blur', () => {
        if(inputEmail.value.length === 0){
            errorEmail.innerHTML = "El campo no puede estar vacío"
        }
        if(!inputEmail.value.includes("@") || !inputEmail.value.includes(".")){
            errorEmail.innerHTML = "El email es inválido"
        }
    })
    inputEmail .addEventListener('input', () => {
            errorEmail.innerHTML = ""
    })

    const inputComentarios = document.getElementById("comentarios")
    const errorComentarios = document.getElementById("error-comentarios")

    inputComentarios.addEventListener('blur', () => {
        if(inputComentarios.value.length === 0){
            errorComentarios.innerHTML = "El campo no puede estar vacío"
        }
        if(inputComentarios.value.length < 20){
            errorComentarios.innerHTML = "Este campo debe tener al menos 20 caracteres"
        }
    })
    inputComentarios.addEventListener('input', () => {
            errorComentarios.innerHTML = ""
    })
}

function start() {
    console.warn('startContacto')
    main.closeSearch() 
    carritoMem.getAll()
    setListeners()
}

// -------------------------------------------
//               Exportacion
// -------------------------------------------

export default {
    start
}