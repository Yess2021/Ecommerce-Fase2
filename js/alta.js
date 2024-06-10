// -------------------------------------------
//               Importacion
// -------------------------------------------
import productosMem from "./productosMem.js";
import carritoMem from "./carritoMem.js";
import servicioProductos from "./servicioProductos.js";
import main from "./main.js";
// -------------------------------------------
//           Variables Globales
// -------------------------------------------
let editarID
let refNombre
let refDetalles
let refPrecio

let tallas = ["X", "M", "L"]
let colores = [[], [], []]  //Se agrega arrays anidados para separar colores por talles

let refColor1 = []
let refColor2 = []
let refColor3 = []

let refStock1 = []
let refStock2 = []
let refStock3 = []

let refFoto
let refBotonAgregarActualizar

//-----------------------------------------------
//           Funciones Globales
// ----------------------------------------------

const funTallas = () => tallas

function currency(total){ 
    return total.toLocaleString()
}

function copiarProductoEnFormulario(producto) {

    for (let campo in producto) {
        if (campo === "colores") {
            for (let talles = 0; talles < tallas.length; talles++) {
                refColor1[talles] = document.getElementById(`color1${tallas[talles]}`)
                refColor2[talles] = document.getElementById(`color2${tallas[talles]}`)
                refColor3[talles] = document.getElementById(`color3${tallas[talles]}`)

                refColor1[talles].value = producto[campo][talles][0] 
                refColor2[talles].value = producto[campo][talles][1]
                refColor3[talles].value = producto[campo][talles][2]
            }
        } else if (campo === "stock") {
            for (let talles = 0; talles < tallas.length; talles++) {
                refStock1[talles] = document.getElementById(`color1C${tallas[talles]}`)
                refStock2[talles] = document.getElementById(`color2C${tallas[talles]}`)
                refStock3[talles] = document.getElementById(`color3C${tallas[talles]}`)

                refStock1[talles].value = producto[campo][talles][0]
                refStock2[talles].value = producto[campo][talles][1]
                refStock3[talles].value = producto[campo][talles][2]
            }
        }
        else {
            if (campo != "datosCompra") {
                const ref = document.getElementById(campo)
                ref.value = producto[campo]
            }
        }
    }
}

function ponerBotonAgregar() {
    refBotonAgregarActualizar.classList.remove('btnActualizar')
    refBotonAgregarActualizar.classList.add('btnAgregar')
    refBotonAgregarActualizar.innerText = 'Agregar'
}

function ponerBotonActualizar() {
    refBotonAgregarActualizar.classList.add('btnActualizar')
    refBotonAgregarActualizar.classList.remove('btnAgregar')
    refBotonAgregarActualizar.innerText = 'Actualizar'
}

function borrarFormulario() {
    refNombre.value = ''
    refDetalles.value = ''
    refPrecio.value = ''

    for (let talles = 0; talles < tallas.length; talles++) {
        refColor1[talles].value = "#ffffff"    
        refColor2[talles].value = "#ffffff"
        refColor3[talles].value = "#ffffff"

        refStock1[talles].value = ''   
        refStock2[talles].value = ''
        refStock3[talles].value = ''
    }
    refFoto.value = ''
}

function formularioValido(producto) {
    for (let campo in producto) {
        if (!producto[campo]) {
            return false
        }
    }
    return true
}

async function agregarActualizar(e) {
    e.preventDefault()
    let nombre = refNombre.value
    let detalles = refDetalles.value
    let precio = +refPrecio.value  
    let stock = [[], [], []]
    for (let talles = 0; talles < tallas.length; talles++) {
        stock[talles].push(refStock1[talles].value, refStock2[talles].value, refStock3[talles].value)
    }
    colores = [[], [], []]
    for (let talles = 0; talles < tallas.length; talles++) {
        colores[talles].push(refColor1[talles].value, refColor2[talles].value, refColor3[talles].value)
    }
    let foto = refFoto.value

    let producto = {
        nombre: nombre,
        detalles: detalles,
        precio: precio,
        stock: stock,
        colores: colores,
        foto: foto,
    }

    if (formularioValido(producto)) {
        if (editarID) {
            producto.id = editarID

            // Actualizamos el producto en el recurso remoto
            const productoActualizado = await servicioProductos.actualizar(editarID, producto)
            // Actualizamos el producto en el recurso local
            productosMem.actualizar(productoActualizado.id, productoActualizado)

            editarID = null
            ponerBotonAgregar()
        }
        else {
            // Guardamos el producto en el recurso remoto
            const productoGuardado = await servicioProductos.guardar(producto)
            // Guardamos el producto en el recurso local
            productosMem.guardar(productoGuardado)
        }
        // Actualizamos la vista y sus listeners con los nuevos datos
        render()

        borrarFormulario()
    }
    else alert('Los datos en el formulario no son validos')
}

function render() {
    let filasTabla

    const productos = productosMem.getAll()

    if (productos.length) {

        filasTabla = `<tr>
                            <th>#</th>
                            <th>nombre</th>
                            <th>detalles</th>
                            <th>precio</th>
                            <th>Talles</th>
                            <th>colores y stock</th>
                            <th>foto</th> 
                            <th>acciones</th>                
                        </tr>`

        for (let i = 0; i < productos.length; i++) {
            filasTabla += `<tr>
                            <td class="centrar">${productos[i].id}</td>
                            <td class="centrar">${productos[i].nombre}</td>
                            <td class="centrar">${productos[i].detalles}</td>
                            <td class="centrar">$ ${currency(productos[i].precio)}</td>
                            <td>`
            if (typeof tallas !== 'string') {
                for (let j = 0; j < tallas.length; j++) {
                    filasTabla += `<div class="talles-container"><p>${tallas[j]}</div>`
                }
            }

            filasTabla += `</td><td><div class="colores-container">`
            if (typeof colores !== 'string') {
                for (let j = 0; j < tallas.length; j++) { 
                    filasTabla += (j > 0) ? `</div><div class="colores-container">` : ""   
                    for (let k = 0; k < 3; k++) {
                        let color = (productos[i].stock[j][k] < 1) ? "#ffffff" : productos[i].colores[j][k]                                            
                        let cantidad = (productos[i].stock[j][k] < 1) ? " " : productos[i].stock[j][k]
                        filasTabla += `<div>
                        <div  class="colores" style="background-color:${color}"></div>
                                                <p class="parrafo">${cantidad}</p>
                                                </div>`
                    }
                }
            }
            filasTabla += ` </div>
                            </td>
                            <td><img class="centrar" width="70" src="${productos[i].foto}" alt="foto de ${productos[i].nombre}"></td>
                            <td>
                               <button ${editarID ? 'disabled' : ''} id="btnBorrar-${productos[i].id}">Borrar</button>
                               ${editarID && editarID == productos[i].id
                    ? `<button id="btnCancelar-${productos[i].id}">Cancelar</button>`
                    : `<button id="btnEditar-${productos[i].id}">Editar</button>`
                }
                            </td>
                           </tr>`
        }
    }
    else filasTabla = '<h2 class="msg-error">No se encontraron productos para mostrar</h2>'

    document.querySelector('table').innerHTML = filasTabla
    setListeners()
}

function setListeners() {
    const botonesBorrar = document.querySelectorAll('.alta table button[id*="btnBorrar-"]')

    botonesBorrar.forEach(boton => {
        boton.addEventListener('click', async () => {
            const id = boton.id.split('-')[1]

            if (confirm(`Esta seguro de borrar el producto de id ${id}?`)) {
                // Borramos el producto en el recurso remoto
                const productoBorrado = await servicioProductos.eliminar(id)
                // Borramos el producto en el recurso local
                productosMem.eliminar(productoBorrado.id)
                // Recargamos la vista y sus listener con los datos nuevos
                render()
            }
        })
    })

    const botonesEditar = document.querySelectorAll('.alta table button[id*="btnEditar-"]')

    botonesEditar.forEach(boton => {
        boton.addEventListener('click', async () => {
            const id = boton.id.split('-')[1]

            editarID = id

            const producto = productosMem.get(id)
           
            copiarProductoEnFormulario(producto)

            ponerBotonActualizar()

            render()
        })
    })

    const botonesCancelar = document.querySelectorAll('.alta table button[id*="btnCancelar-"]')

    botonesCancelar.forEach(boton => {
        boton.addEventListener('click', async () => {
            const id = boton.id.split('-')[1]

            editarID = null

            borrarFormulario()
            ponerBotonAgregar()

            render()
        })
    })

    // Agrega en automatico los colores para las talles subsequentes 
    const botonColor = []

    for (let i = 1; i <= colores.length; i++) {
        botonColor[i] = document.getElementById(`color${i + tallas[0]}`)

        botonColor[i].addEventListener('change', () => {
            for (let j = 1; j < tallas.length; j++) {
                document.getElementById(`color${i + tallas[j]}`).value = botonColor[i].value
            }
        }
        )
    }

    const inputNombre = document.getElementById("nombre")
    const errorNombre = document.getElementById("error-nombre")

    inputNombre.addEventListener('blur', () => {
        if(inputNombre.value.length === 0){
            errorNombre.innerHTML = "El campo no puede estar vacío"
        }
        if(inputNombre.value.length < 3){
            errorNombre.innerHTML = "El nombre debe tener al menos 3 caracteres"
        }
    })
    inputNombre.addEventListener('input', () => {
            errorNombre.innerHTML = ""
    })


    const inputDetalles = document.getElementById("detalles")
    const errorDetalles = document.getElementById("error-detalles")

    inputDetalles.addEventListener('blur', () => {
        if(inputDetalles.value.length === 0){
            errorDetalles.innerHTML = "El campo no puede estar vacío"
        }
    })
    inputDetalles.addEventListener('input', () => {
            errorDetalles.innerHTML = ""
    })

    const inputPrecio = document.getElementById("precio")
    const errorPrecio = document.getElementById("error-precio")

    inputPrecio.addEventListener('blur', () => {
        if(inputPrecio.value.length === 0){
            errorPrecio.innerHTML = "El campo no puede estar vacío"
        }
        if(inputPrecio.value.toString().length > 5){
            errorPrecio.innerHTML = "Precio muy alto"
        }
    })
    inputPrecio.addEventListener('input', () => {
            errorPrecio.innerHTML = ""
    })

    const inputFoto = document.getElementById("foto")
    const errorFoto = document.getElementById("error-foto")

    inputFoto.addEventListener('blur', () => {
        if(inputFoto.value.length === 0){
            errorFoto.innerHTML = "El campo no puede estar vacío"
        }
    })
    inputFoto.addEventListener('input', () => {
            errorFoto.innerHTML = ""
    })
}

async function start() {

    console.warn('startAlta')

    main.closeSearch()  
    carritoMem.getAll()

    let filasTabla = ''
    editarID = null

    // Se agregan entradas de colores y cantidades por talla en forma dinamica
    for (let i = 0; i < tallas.length; i++) {
        filasTabla += `<label for="colores">colores talle ${tallas[i]} </label>
        <div style="display:flex;width:70%;margin: 0 auto;" class="entrada" id="small">
            <input id="color1${tallas[i]}"  type="color" name="color1" autocomplete="off"  value="#ffffff">
            <input id="color1C${tallas[i]}" type="number" name="color1c" autocomplete="off" value="0">
            <input id="color2${tallas[i]}" type="color" name="color2" autocomplete="off" value="#ffffff">
            <input id="color2C${tallas[i]}" type="number" name="color2c" autocomplete="off" value="0">
            <input id="color3${tallas[i]}" type="color" name="color3" autocomplete="off" value="#ffffff">
            <input id="color3C${tallas[i]}" type="number" name="color3c" autocomplete="off" value="0">
        </div>`
    }
    document.getElementById('colores-cantidades').innerHTML = filasTabla

    // Referencias a elementos de entrada por sus IDs
    refNombre = document.getElementById('nombre')
    refDetalles = document.getElementById('detalles')
    refPrecio = document.getElementById('precio')

    for (let j = 0; j < tallas.length; j++) {
        refStock1[j] = document.getElementById(`color1C${tallas[j]}`)
        refStock2[j] = document.getElementById(`color2C${tallas[j]}`)
        refStock3[j] = document.getElementById(`color3C${tallas[j]}`)

        refColor1[j] = document.getElementById(`color1${tallas[j]}`)
        refColor2[j] = document.getElementById(`color2${tallas[j]}`)
        refColor3[j] = document.getElementById(`color3${tallas[j]}`)
    }

    refFoto = document.getElementById('foto')

    refBotonAgregarActualizar = document.querySelector('.alta form button')

    let refFormAlta = document.querySelector('main form')
    refFormAlta.onsubmit = agregarActualizar

    const productos = await servicioProductos.getAll()
    productosMem.set(productos)

    render()
}

// -------------------------------------------
//               Exportacion
// -------------------------------------------

export default {
    start,
    funTallas,
    currency  
}