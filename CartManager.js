import fs from 'fs'

export default class CartManager {
    constructor(path) {
        this.path = path
    }

    async getCarts () {
        if (fs.existsSync(this.path)) {
            const cartFile = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(cartFile)
        } else {
            return []
        }
    }

    async getCart (id) {
        const cartFile = await this.getCarts()
        const cart = cartFile.find(c => c.id === id)
        if(cart){
            return cart
        } else {
            return 'Not found'
        }
    }

    async getCartById (idCart) {
        const cartFile = await this.getCarts()
        const cart = JSON.parse(cartFile)
        const findCart = cart.find((c) => c.id == idCart)
        if (findCart) {
            return findCart
        } else {
            return 'Not found'
        }
    }

    async createCart(obj) {
        const cartFile = await this.getCarts()
        const newCart ={
            id: this.#idGenerator(cartFile),
            products: [],
        }
        cartFile.push(newCart)
        await fs.promises.writeFile(this.path, JSON.stringify(cartFile))
        return newCart
    }

    async addProductsToCart (idCart, idProd) {
        const cart = await this.getCart(idCart)
        if(!cart) return 'Cart does not exist'
        const productIndex = cart.product.findIndex(p => p.product === idProd)
        if (productIndex === -1) {
            cart.products.push({product: idProd, quantity: 1})
        } else {
            cart.products[productIndex].quantity ++
        }
        const cartFile = await this.getCarts()
        const cartIndex = cartFile.findIndex(c => c.id === idCart)
        cartFile.splice(cartIndex, 1, cart)
        await promises.writeFile(this.path, JSON.stringify(cartFile))
        return 'Product added'
    
    }

    #idGenerator = (products) => {
		let id = products.length === 0 ? 1 : products[products.length - 1].id + 1;
		return id;
	};
}