const fs = require('fs')

const path = 'Products.json'
class ProductManager {

    constructor(path) {
        this.path = path
    }
    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const infoArchivo = await fs.promises.readFilse(this.path, 'utf-8')
            const infoProducts = JSON.parse(infoArchivo)
            return infoProducts
        } else {
            console.log('El archivo no existe')
            return []
        }
    }

    addProduct = async (product) => {
        const products = await this.getProducts()
        let id
        if (products.length === 0) {
            id = 1
        } else {
            products[products.length - 1].id + 1
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
            .catch(console.log('Usuario no encontrado'))
    }

    updateProduct = async (id, obj) => {
        const products = this.getProducts()
        const indexProduct = products.findIndex(p => p.id === id)
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
            return 'Not found'
        }
    }

}


