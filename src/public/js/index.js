const socket = io()

const form = document.querySelector('#createProductForm')
form.addEventListenner('submit', (event) => {
    event.preventDefault()
    const name = document.querySelector('#productTitle').value
    const price= document.querySelector('#productPrice').value
    const description= document.querySelector('#productDescription').value
    const stock= document.querySelector('#productStock').value
    socket.emit('createProduct', product = { title: name, price, description, stock})
    form.reset()
})

socket.on('productList', (products) => {

    const productTable = document.querySelector('#productTable tbody')
    productTable.innerHTML = ''
    products.forEach((p) => {
        const tr = document.createElement('tr')
        tr.innerHTML = `<td>${p.title}</td><td>$${p.price}</td><td><button class='deleteProduct' data-id='${p.id}'>Borrar</button></td>`
        productTable.appendChild(tr)
    })
})

const productTable = document.querySelector('#productTable tbody')
productTable.addEventListener('click', (event) => {
    if(event.target.classList.contains('deleteProduct')) {
        const id = event.target.dataset.id
        socket.emit('deleteProduct', parseInt(id))
    }
})