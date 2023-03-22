import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import ProductManager from '../ProductManager.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.use('/static', express.static(__dirname + '/public'))

app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)

app.engine('handlebars', handlebars.engine())

app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('views', viewsRouter)

const httpServer = app.listen(8080, () => {
    console.log('Escuchando puerto 8080')
})

const io = new Server(httpServer)

const productManager = new ProductManager(__dirname + '/products.json')

const products = await productManager.getProducts()

io.on('connection', (socket) => {

    socket.on('createProduct', async (product) =>{
        
        const productsPush = products
        productsPush.push(product)

        io.emit('productList', productsPush)

        await productManager.addProduct(product)
    })

    socket.on('deleteProduct', async (id) => {
        const productsPush = products.filter((product) => product.id != id)

        io.emit ('productList', productsPush)

        await productManager.deleteProductById(id)
    })
})