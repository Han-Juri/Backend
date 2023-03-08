import fs, { existsSync } from 'fs'

export default class ProductManager {
    constructor(path) {
        this.path = path
    }

    async getProducts() {
        if (fs.existsSync(this.path)) {
            const products = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(products)
        } else {
            return []
        }
    }

    async getProductsById(idProd) {
        const productsFile = await this.getProducts()
        const product = productsFile.find((p) => p.id === idProd)
        if (product) {
            return product
        } else {
            return 'Not found'
        }
    }

    async addProduct(obj) {
        const productsFile = await this.getProducts()
        const id = this.#idGenerator(productsFile)
        const newProduct = { id, ...obj }
        productsFile.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
        return newProduct
    }

    async updateProduct (idProd, obj) {
        const productsFile = await this.getProducts()
        const product = productsFile.find((p) => p.id === idProd)
        if (!product) {
            return 'Not found'
        } else {
            const updatedProduct = { ...product, ...obj }
            const productIndex = productsFile.findIndex((p) => p.id === idProd)
            productsFile.splice(productIndex, 1, updatedProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
            return 'Product updated'
        }
    }

    async deleteProducts() {
        if (existsSync(this.path)) {
            await fs.promises.unlink(this.path)
            return 'All products deleted'
        } else {
            return 'Not found'
        }
    }

    async deleteProductsById(idProd) {
        const productsFile =await this.getProducts()
        const productIndex = productsFile.findIndex((p) => p.id === idProd)
        if (productIndex === -1) {
            return 'Not found'
        } else {
            productsFile.splice(productIndex, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
            return 'Product deleted'
        }
    }

    #idGenerator = (products) => {
		let id = products.length === 0 ? 1 : products[products.length - 1].id + 1;
		return id;
	};
}

const product1 = {
    title: "TV",
    description: "Lalalalalooooo",
    price: 200,
    thumbnail: "imagen",
    code: 584444458,
    stock: 100
}
const product2 = {
    title: "Play4",
    description: "Opaaaa",
    price: 200000,
    thumbnail: "imagen",
    code: 58142538,
    stock: 101
}
const product3 = {
    title: "Play5",
    description: "Ufffffff",
    price: 400000,
    thumbnail: "imagen",
    code: 577858,
    stock: 1044
}
const product4 = {
    title: "Celular",
    description: "Atendeeeeeeeee",
    price: 200000,
    thumbnail: "imagen",
    code: 5858,
    stock: 1033
}
const product5 = {
    title: "Auriculares",
    description: "Taraaaaaaan",
    price: 200,
    thumbnail: "imagen",
    code: 585745378,
    stock: 10555
}