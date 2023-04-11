import { Router } from 'express'
import ProductManager from '../dao/ProductManagerMongo.js'
//import ProductManager from '../dao/ProductManagerFS.js'
import { __dirname } from '../utils.js'

const router = Router()

const productManager = new ProductManager(__dirname + '/products.json')

router.get('/', async (req, res) => {
    const { limit } = req.query
    const products = await productManager.getProducts()
    if (!limit) {
        res.json({ products })
    } else {
        let newLimit = parseInt(req.query.limit)
        const limitProducts = products.filter((p) => p.id <= newLimit)
        res.json({ limitProducts })
    }
})

router.get('/:pid', async (req, res) => {
    const { pid } = req.params
    const product = await productManager.getProductById(+pid)
    if (product.length === 0) {
        res.json({ message: 'Not found' })
    } else {
        res.json(product)
    }
})

router.post ('/' , async (req, res) => {
    const obj = req.body
    const newProduct = await productManager.addProduct(obj)
    res.json({ message: 'Product created', product: newProduct })
})

router.put('/:pid', async (req, res) => {
    const { pid } = req.params
    const obj = req.body
    const product = await productManager.updateProduct(+pid, +obj)
    res.json({ product })
})

router.delete('/', async (req, res) => {
    const deleted =await productManager.deleteProducts()
    res.json({ deleted })
})

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    const products = await productManager.deleteProductById(+pid)
    res.json({ products })
})

export default router