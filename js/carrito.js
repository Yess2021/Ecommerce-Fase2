// -------------------------------------------
//              Importaciones
// -------------------------------------------
import carritoMem from "./carritoMem.js";
import servicioCarrito from "./servicioCarrito.js"
import main from "./main.js";
import alta from "./alta.js";
import inicio from "./inicio.js";

// -------------------------------------------
//           Variables Globales
// -------------------------------------------
let refBorrar
let refPedir
let refTotal

// -------------------------------------------
//           Funciones Globales
// -------------------------------------------

function agregar(producto, tallayColorEscogido) {
    const id = producto.id
    const prodExistente = carritoMem.get(id)
    let consecutivo  
    let talla = tallayColorEscogido.talla
    let tallaIndex = tallayColorEscogido.tallaIndex
    let color = tallayColorEscogido.color
    let colorIndex = tallayColorEscogido.colorIndex
    let cantidad = tallayColorEscogido.cantidad

    let objSeleccion = {
        talla: [talla],
        tallaIndex: [tallaIndex],
        color: [color],
        colorIndex: [colorIndex],
        cantidad: [cantidad]
    }

    if (!prodExistente) {  
        consecutivo=[0]     
        objSeleccion.idTC=consecutivo 
        let datosCompra = producto.datosCompra
        datosCompra.push(objSeleccion)
        producto.datosCompra = datosCompra 
        carritoMem.guardar(producto)    
        return true
    }
    else {         
            let datosCompra=prodExistente.datosCompra
            consecutivo++     

            let arrayidTC=datosCompra[0].idTC    
            let arrayColor=datosCompra[0].color
            let arrayColorIndex=datosCompra[0].colorIndex
            let arrayTalla=datosCompra[0].talla
            let arrayTallaIndex=datosCompra[0].tallaIndex 
            let arrayCantidad=datosCompra[0].cantidad     
           
            let cantidadLength=arrayCantidad.length
         
            if (arrayTalla.includes(talla)){
                
                for (let index=0;index<arrayTalla.length;index++){
                    let value=arrayTalla[index]
                    let cantidadSolicitada=arrayCantidad[index]
                if(talla==value){
                    if(color==arrayColor[index]) {  

                        if(cantidadSolicitada<producto.stock[tallaIndex][colorIndex]) {               
                            cantidadSolicitada++
                            arrayCantidad.splice(index,1,cantidadSolicitada)
                            datosCompra[0].cantidad=arrayCantidad
                            prodExistente.datosCompra=datosCompra
                            carritoMem.actualizar(id, prodExistente)
                            
                            return true
                        }
                        return false
                    }
                    else {   

                    consecutivo=arrayidTC[cantidadLength-1]    
                    consecutivo++
                    arrayidTC.splice(cantidadLength,0,consecutivo)    
                    arrayColor.splice(cantidadLength,0,color)
                    arrayColorIndex.splice(cantidadLength,0,colorIndex)
                    arrayTalla.splice(cantidadLength,0,talla)
                    arrayTallaIndex.splice(cantidadLength,0,tallaIndex)
                    arrayCantidad.splice(cantidadLength,0,cantidad) 
                   
                    datosCompra[0].idTC=arrayidTC     
                    datosCompra[0].color=arrayColor
                    datosCompra[0].colorIndex=arrayColorIndex
                    datosCompra[0].talla=arrayTalla
                    datosCompra[0].tallaIndex=arrayTallaIndex
                    datosCompra[0].cantidad=arrayCantidad
                   
                    prodExistente.datosCompra=datosCompra
                    carritoMem.actualizar(id, prodExistente)
                    
                    return true
                }
                }
                index++ 
            }
            }
            else{ 
            consecutivo=arrayidTC[cantidadLength-1]
            consecutivo++    
            arrayidTC.splice(cantidadLength,0,consecutivo)    
            arrayColor.splice(cantidadLength,0,color)
            arrayColorIndex.splice(cantidadLength,0,colorIndex)
            arrayTalla.splice(cantidadLength,0,talla)
            arrayTallaIndex.splice(cantidadLength,0,tallaIndex)
            arrayCantidad.splice(cantidadLength,0,cantidad) 

            datosCompra[0].idTC=arrayidTC     
            datosCompra[0].color=arrayColor
            datosCompra[0].colorIndex=arrayColorIndex
            datosCompra[0].talla=arrayTalla
            datosCompra[0].tallaIndex=arrayTallaIndex
            datosCompra[0].cantidad=arrayCantidad

            prodExistente.datosCompra=datosCompra
            carritoMem.actualizar(id, prodExistente)
            return true
        }         
    }
    return false
}

function render() {
    main.closeSearch()  
    let filasTabla
    const carrito = carritoMem.getAll()
    let total=0  

    if (carrito.length) {

        filasTabla = `<tr>
                          <th>nombre</th>  
                          <th>talle</th>
                          <th>colores</th>
                          <th>foto</th> 
                          <th>cantidad</th> 
                          <th>precio</th>
                          <th>subtotal</th>
                          <th>acciones</th>                
                       </tr>`

        for (let i = 0; i < carrito.length; i++) {
            let datosCompra = carrito[i].datosCompra
            let arrayTalla=datosCompra[0].talla 
            let arrayTallaIndex=datosCompra[0].tallaIndex
            let arrayColorIndex=datosCompra[0].colorIndex
            let arrayCantidad=datosCompra[0].cantidad
            let arrayidTC=datosCompra[0].idTC

            filasTabla += `<tr>
                           <td class="centrar">${carrito[i].nombre}</td>
                           <td class="centrar">`

                            arrayTalla.forEach((talla)=>{
            filasTabla +=  `<p>${talla} </p>`} )

            filasTabla += `<td class="centrar">`                           

                            arrayTallaIndex.forEach((talla,index)=>{
            filasTabla += `<div class="colores centrar" style="background-color:${carrito[i].colores[talla][arrayColorIndex[index]]}">
                               </div>`
                            })
                               
            filasTabla +=  `</div></td>
                            <td class="centrar"><img width="60" src="${carrito[i].foto}" alt="foto de ${carrito[i].nombre}"></td>
                            `

            filasTabla += `<td class="centrar">`

                        arrayCantidad.forEach((value,index2)=>{
                           let colorIndex=arrayColorIndex[index2]
                           let tallaIndex=arrayTallaIndex[index2]
                           let idTC=arrayidTC[index2]
                           let btnId=carrito[i].id+"-"+idTC+"-"+colorIndex+"-"+tallaIndex 
            filasTabla += `<div class="btn-inline"><div id="p-inline">${value} 
                            <button id="btnDecrementar-${btnId}">-</button>
                            <button id="btnIncrementar-${btnId}">+</button></div></div>` 
                        })
                                                                          
            filasTabla += ` </td>
                            <td class="centrar">$ ${alta.currency(carrito[i].precio)}</td>`  
            
            filasTabla+=calculo(arrayCantidad,carrito[i].precio) 
            total+=calculo(arrayCantidad,carrito[i].precio,0)    
                                    
            filasTabla += `<td>  
                          <button id="btnBorrar-${carrito[i].id}">Borrar</button>
                          </td>
                          </tr>`
        }    
        refBorrar.style.display = 'block'
        refPedir.style.display = 'block'
        refTotal.style.display = 'block'
    }
    else {
        filasTabla = '<h2 class="msg-error">No se encontraron pedidos para mostrar</h2>'
        refBorrar.style.display = 'none'  
        refPedir.style.display = 'none'
        refTotal.style.display = 'none'
    }
    document.querySelector('.carrito table').innerHTML = filasTabla
    if (filasTabla.length>65){
        const totalCompra=document.getElementById('total')
        totalCompra.innerHTML=`<td>$ ${alta.currency(total)}</td>`
    }
    setListeners()
}

function borrarCarrito() {
    if (confirm(`Esta seguro de borrar el producto del carrito ? `)) {
        // Borramos el producto en el recurso local
        carritoMem.clear()
        // Recargamos la vista y sus listener con los datos nuevos
        render()
    }
}

async function enviarPedido(pedido) {
    await servicioCarrito.enviar(pedido)

    carritoMem.clear()
    render()
}

function generarPedido() {
    const carrito = carritoMem.getAll();
    carrito.forEach((producto) => {
      let id = producto.id;
      let nombre = producto.nombre;
      let detalles = producto.detalles;
      let precio = producto.precio;
      let foto = producto.foto;
  
      let datosCompra = producto.datosCompra;
      let arrayTalla = datosCompra[0].talla;
      let arrayColor = datosCompra[0].color;
      let arrayCantidad = datosCompra[0].cantidad;
      arrayTalla.forEach((talla, index) => {
        let color = arrayColor[index];
        let cantidad = arrayCantidad[index];
        let datosPedido = {
          id: id,
          nombre: nombre,
          detalles: detalles,
          precio: precio,
          foto: foto,
          talla: talla,
          color: color,
          cantidad: cantidad,
        };
        enviarPedido(datosPedido);
      });
    });
    inicio.mostrarAlert("Pedido recibido!", 5)
  }

function decrementarItem(boton) {
    const id = boton.id.split('-')[1]
    const idTC=boton.id.split('-')[2]
    const producto = carritoMem.get(id)
    let datosCompra=producto.datosCompra
    let arrayCantidad=datosCompra[0].cantidad
    let cantidad=arrayCantidad[idTC]

    if (cantidad > 1) {
        cantidad--
        arrayCantidad.splice(idTC,1,cantidad)
        datosCompra[0].cantidad=arrayCantidad

        producto.datosCompra=datosCompra
        carritoMem.actualizar(id, producto)

        render()
    }
}

function incrementarItem(boton) {
    const id = boton.id.split('-')[1]
    const idTC=boton.id.split('-')[2]
    const colorIndex=boton.id.split('-')[3]
    const tallaIndex=boton.id.split('-')[4]
    const producto = carritoMem.get(id)
    let datosCompra=producto.datosCompra
    let arrayStock=producto.stock
    let stock=arrayStock[tallaIndex][colorIndex]
    let arrayCantidad=datosCompra[0].cantidad
    let cantidad=arrayCantidad[idTC]
        
    if (cantidad < stock) {
        cantidad++
        arrayCantidad.splice(idTC,1,cantidad)
        datosCompra[0].cantidad=arrayCantidad

        producto.datosCompra=datosCompra
        carritoMem.actualizar(id, producto)

        render()
    } 
}

function calculo(array,precio,inicial="no"){  
    let string='<td class="centrar">'
    array.forEach((value)=>{
        let subtotal=value*precio
        string+= `<p>$ ${alta.currency(subtotal)}</p>`
        inicial=(inicial=="no")?"no":inicial+=subtotal
        inicial=(!inicial)?0:inicial
    })
    string +=`</td>`
    return (inicial=="no")?string:inicial
}


function setListeners() {
    const botonesBorrar = document.querySelectorAll('.carrito table button[id*="btnBorrar-"]')

    botonesBorrar.forEach(boton => {
        boton.addEventListener('click', async () => {
            const id = boton.id.split('-')[1]

            if (confirm(`Esta seguro de borrar el producto del carrito id ${ id }?`)) {
                // Borramos el producto en el recurso local
                carritoMem.eliminar(id)
                // Recargamos la vista y sus listener con los datos nuevos
                render()
            }
        })
    })

    const botonesDecrementar = document.querySelectorAll('.carrito table button[id*="btnDecrementar-"]')

    botonesDecrementar.forEach(boton => {
        boton.addEventListener('click', async () => {
            decrementarItem(boton)
        })
    })

    const botonesIncrementar = document.querySelectorAll('.carrito table button[id*="btnIncrementar-"]')

    botonesIncrementar.forEach(boton => {
        boton.addEventListener('click', async () => {

            incrementarItem(boton)
        })
    })
}

function start() {
    console.warn('startCarrito')
    refBorrar = document.querySelector('.carrito__borrar')
    refPedir = document.querySelector('.carrito__pedir')
    refTotal = document.getElementById("seccionTotal")

    refBorrar.addEventListener('click', () => {
        borrarCarrito()
    })
    refPedir.addEventListener('click', () => {
        generarPedido()
    })  
    render()
}

// -------------------------------------------
//               Ejecución
// -------------------------------------------

// -------------------------------------------
//               Exportacion
// -------------------------------------------

export default {
    start,
    agregar
}