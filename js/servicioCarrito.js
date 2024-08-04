// const url = 'https://6626b1c3b625bf088c06654c.mockapi.io/api/carrito/'
const url = 'http://localhost:8080/api/carrito/'

const enviar = async pedido => await fetch(url, {
    method: 'POST',
    headers: { 'content-type':'application/json'},
    body: JSON.stringify(pedido)
}).then(r => r.json())

// -------------------------------------------
//               Exportacion
// -------------------------------------------

export default {
    enviar
}