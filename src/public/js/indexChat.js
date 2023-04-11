const socketClient = io()

const tituloUsuario = document.getElementById('usuario')
const formulario = document.getElementById('formulario')
const inputMensaje = document.getElementById('mensaje')
const divChat = document.getElementById('chat')

let user

Swal.fire({
    title: 'Bienvenido',
    text: 'Ingresa tu usuario',
    input: 'text',
    inputValidator: value => {
        if(!value){
            return 'Necesitas ingresar un usuario'
        }
    }
}).then(userName => {
    user = userName.value
    tituloUsuario.innerText = user
    socketClient.emit('usuarioNuevo', usuario)
    inputMensaje.value = ''
})

formulario.onsubmit = (e) => {
    e.preventDefault()
    const info = {
        nombre: usuario,
        mensaje: inputMensaje.value
    }
    socketClient.emit('mensaje', info)
}

socketClient.on('chat', mensajes => {
    console.log(mensajes)

    const chatParrafo = mensajes.map(obj => {
        return `<p>${obj.nombre}: ${obj.mensaje}</p>`
    }).join(' ')

    divChat.innerHTML = chatParrafo
})

socketClient.on('broadcast', usuario => {

    Toastify({
        text: `${usuario} conectado al chat`,
        duration: 3000,
        position: "right", 
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
})
