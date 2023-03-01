class ProductManager {

    constructor() {
        this.products = []
    }
    getProducts() {
        return this.products
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        let correct = 0
        const id = this.products.length === 0
            ? 1
            : this.products[this.products.length - 1].id + 1

        const product = {
            id,
            title,
            description,
            price: price,
            thumbnail,
            code,
            stock
        }

        if (product.title === null || product.title === '') {
            console.log('Debe ingresar un nombre valido')
            correct = 1
        }

        if (product.description === null || product.description === '') {
            console.log('Debe ingresar una descripcion valida')
            correct = 1
        }

        if (product.price === null || product.price < 0) {
            console.log('Debe ingresar un precio valido')
            correct = 1
        }

        if (product.thumbnail === null || product.thumbnail === '') {
            console.log('Debe ingresar una imagen valida')
            correct = 1
        }

        if (product.code === null || product.code < 1) {
            console.log('Debe ingresar un codigo valido')
            correct = 1
        }

        if (product.stock === null || product.stock <= 0) {
            console.log('Faltan productos')
            correct = 1
        }

        this.products.forEach(e => {
            if (e.code === product.code) {
                console.log('Este codigo ya existe')
                correct = 1
            }
        });

        if (correct === 0) {
            this.products.push(product)
        }
    }

    deleteProduct = (id) => {
        const products = this.getProducts()
        const newList = products.filter(p => p.id !== id)
        if(newList){
            return newList
        } else {
            return 'Not found'
        }
    }

    updateProduct = (id, obj) => {
        const products = this.getProducts()
        const indexProduct = products.findIndex(p => p.id === id)
        if (indexProduct === -1) {
            return 'Not found'
        }
        const productsUpdate = { ...products[indexProduct], ...obj }
        products.splice(indexProduct, 1, productsUpdate)
        return products
    }

    getElementById = (id) => {

        let productoPorId = this.getProducts()
        this.products.find(e => {
            if (e.id === id) {
                productoPorId = e
                console.log(productoPorId)
                return productoPorId
            } else {
                console.log('Not found')
            }
        });
    }

}

//const producto = new ProductManager()

//console.log(producto.getProducts())

//producto.addProduct('Manola', 'Hawaii', 60, 'Imagen', 535, 5)
//producto.addProduct('Manola', 'Hawaii', 60, 'Imagen', 535, 5)
//producto.addProduct('Juance', 'Juanelo', 60, 'Imagen', 53535353, 5)
//producto.addProduct('Magdalena', 'Hawaii', 90, 'Imagen', 53533, 5)

//console.log(producto.getProducts())

//console.log(producto.getElementById(2))
