import fs from 'fs'

export default class CartManager {
    constructor(path) {
        this.path = path
    }

    async getCart () {
        if (fs.existsSync(this.path)) {
            const cartFile = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(cartFile)
        } else {
            return []
        }
    }

    async getCartById (idCart) {
        const cartFile = await this.getCart()
        const cart = JSON.parse(cartFile)
        const findCart = cart.find((c) => c.id == idCart)
        if (findCart) {
            return findCart
        } else {
            return 'Not found'
        }
    }

    async addCart () {
        const cartFile = await this.getCart()
        const id = this.#idGenerator(cartFile)
        const newInCart = { id: id, products: [] }
        cartFile.push(newInCart)
        await fs.promises.writeFile(this.path, JSON.stringify(cartFile))
        return newInCart
    }

    async addProductsToCart (idCart, idProd) {
        const cartFile = await this.getCart()
        const cart = cartFile.find((c) => c.id === idCart)
        let q = 1
        const obj = { product: idProd, quantity: q }
        if (!cart) {
            return 'Cart empty'
        } else {
            const product = cart.products.find((p) => p.product === idProd)
            if(!product) {
                cart.products.push(obj)
                const cartIndex = cartFile.findIndex((p) => p.id === idCart)
                cartFile.splice(cartIndex, 1, cart)
                await fs.promises.writeFile(this.path, JSONN.stringify( cartFile ))
                return 'Product in cart'
            } else {
                product.quantity++
                const cartIndex = cartFile.findIndex((p) => p.id === idCart)
                cartFile.splice(cartIndex, 1, cart)
                await fs.promises.writeFile(this.path, JSON.stringify(cartFile))
                return 'Product added'
            }
        }
    }

    #idGenerator = (products) => {
		let id = products.length === 0 ? 1 : products[products.length - 1].id + 1;
		return id;
	};
}