import { Router } from 'express'
import CartManager from '../../CartManager.js'

const path = 'cart.json'
const router = Router()

const cartManager = new CartManager(path)

const products = []

router.post('/', async (req, res) => {
    const newCart = await cartManager.addCart()
    res.json ({ message: 'Cart created', cart: newCart })
})

router.get('/:cid', async (req, res) => {
    const { cid } = req.params
    const cart = await cartManager.getCartById(+cid)
    if (cart.length === 0) {
        res.json({ message: 'Cart empty' })
    } else {
        res.json(cart)
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const newCart = await cartManager.addProductsToCart(+cid, +pid)
    res.json(newCart)
})

export default router