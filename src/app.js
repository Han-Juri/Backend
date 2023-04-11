import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import ProductManager from './dao/ProductManagerFS.js'
import './db/dbConfig.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.use('/static', express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())

app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)
app.use('/views', viewsRouter)

const httpServer = app.listen(8080, () => {
    console.log('Escuchando puerto 8080')
})

const socketServer = new Server(httpServer)

const productManager = new ProductManager(__dirname + '/products.json')

const products = await productManager.getProducts()

const infoMensajes = []

socketServer.on('connection', (socket) => {

    console.log(`Usuario conectado: ${socket.id}`)

    socket.on('disconnect', () => {
        console.log(`Usuario desconectado: ${socket.id}`)
    })

    socket.on('mensaje', info => {
        infoMensajes.push(info)
        socketServer.emit('chat', infoMensajes)
    })

    socket.on('usuarioNuevo', usuario => {
        socket.broadcast.emit('broadcast', usuario)
    })

    socket.on('createProduct', async (product) =>{
        
        const productsPush = products
        productsPush.push(product)

        socketServer.emit('productList', productsPush)

        await productManager.addProduct(product)
    })

    socket.on('deleteProduct', async (id) => {
        const productsPush = products.filter((product) => product.id != id)

        socketServer.emit ('productList', productsPush)

        await productManager.deleteProductById(id)
    })
})