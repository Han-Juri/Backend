import { productsModel } from '../db/models/products.model.js'

export default class ProductManager {
    async getProducts() {
        try{
            const allProducts = await productsModel.find()
            return allProducts
        } catch (error) {
            console.log(error)
        }
    }

    async getProductsById(idProd) {
        try{
            const findProduct = await productsModel.findById(idProd)
            return findProduct
        } catch (error) {
            console.log(error)
        }
    }

    async addProduct(obj) {
        try{
            const newProduct = await productsModel.create(obj)
            return newProduct
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(idProd, obj) {
        try{
            const updateProduct = await productsModel.updateOne(idProd, obj)
            return updateProduct
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProducts() {
        try{
            await productsModel.deleteMany()
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductById(idProd) {
        try{
            const deletedProduct = await productsModel.deleteOne(idProd)
            return deletedProduct
        } catch (error) {
            console.log(error)
        }
    }
}