const fs = require('fs')

const path = 'Products.json'
class ProductManager {

    constructor(path) {
        this.path = path
    }
    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const infoArchivo = await fs.promises.readFile(this.path, 'utf-8')
            const products = JSON.parse(infoArchivo)
            return products
        } else {
            console.log('El archivo no existe')
            console.log([])
        }
    }

    addProduct = async (product) => {
        const products = await this.getProducts()
        let id
        if (products.length === 0) {
            id = 1
        } else {
           id = products[products.length - 1].id + 1
        }
        const newProduct = { id, ...product }
        products.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(products))
        return newProduct

    }

    deleteProduct = async (id) => {
        const products = await this.getProducts()
        const newList = products.filter(p => p.id !== id)
        await fs.promises.writeFile(this.path, JSON.stringify(newList))
            .catch(console.log('User not found'))
    }

    updateProduct = async (id, obj) => {
        const products = await this.getProducts()
        const indexProduct = products.findIndex((p) => p.id === id)
        if (indexProduct === -1) {
            return 'Not found'
        }
        const productsUpdate = { ...products[indexProduct], ...obj }
        products.splice(indexProduct, 1, productsUpdate)
        await fs.promises.writeFile(this.path, JSON.stringify(products))
    }

    getElementById = async (id) => {

        const products = await this.getProducts()
        const product = products.find(p => p.id === id)
        if(product){
            return product
        } else {
            console.log('Not found')
        }
    }

}

const producto1 = {
    title: 'TV',
    description: 'Lalalalalooooo',
    price: 200,
    thumbnail: 'imagen',
    code: 585858,
    stock: 10
}
const producto2 = {
    title: 'celu',
    description: 'Lololololaaaaaaaa',
    price: 2000,
    thumbnail: 'imagen',
    code: 5855555555555858,
    stock: 1000
}

async function prueba() {
    const manager = new ProductManager('Products.json')
    await manager.getProducts()
    //await manager.addProduct(producto1)
    //await manager.addProduct(producto2)

}

prueba()