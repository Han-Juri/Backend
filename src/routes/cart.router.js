import { Router } from 'express'
//import CartManager from '../dao/CartManagerMongo.js'
import CartManager from '../dao/CartManagerFS.js'
import { __dirname } from '../utils.js'

const router = Router()

const cartManager = new CartManager(__dirname + '/cart.json')

const products = []

router.post('/', async (req, res) => {
    const newCart = await cartManager.createCart()
    res.json({cart: newCart})
})

router.get('/:idCart', async (req, res) => {
    const { idCart } = req.params
    const cart = await cartManager.getCart(+idCart)
    if (cart.length === 0) {
        res.json({ message: 'Cart empty' })
    } else {
        res.json(cart)
    }
})

router.post('/:idCart/product/:idProd', async (req, res) => {
    const { idCart, idProd } = req.params
    const newCart = await cartManager.addProductsToCart(+idCart, +idProd)
    res.json({message: 'Product added'})
})

export default router