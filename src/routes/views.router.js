import { Router } from 'express'
import ProductManager from '../dao/ProductManagerFS.js'
//import ProductManager from '../dao/ProductManagerMongo.js'
import MessagesManager from '../dao/MessagesManagerMongo.js'
import { __dirname } from '../utils.js'

const router = Router()
const productManager = new ProductManager(__dirname + '/products.json')
const messagesManager = new MessagesManager()

router.get('/', async (req, res) => {
    const products = await productManager.getProducts()
    res.render('home', { products })
})

router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts()
    res.render('realTimeProducts', { products })
})

router.get('/chat', async (req, res) => {
    const chat = await messagesManager.getMessages()
    res.render('chat', { chat })
})

export default router