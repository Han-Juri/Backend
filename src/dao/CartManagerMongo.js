import { cartModel } from '../db/models/cart.model.js'

export default class CartManager {
    async getCarts() {
         try{
            const allCarts = await cartModel.find()
            return allCarts
        } catch (error) {
            console.log(error)
         }
    }

    async getCart(idCart) {
        try{
            const allCarts = await cartModel.findById(idCart)
            return allCarts
        } catch (error) {
            console.log(error)
         }
    }

    async createCart(obj) {
        try{
            const newCart = await cartModel.create(obj)
            return newCart
        } catch (error) {
            console.log(error)
        }
    }

    async addProductsToCart(idCart, idProd) {
        try{
            const addToCart = await cartModel.insertMany(idCart, idProd)
            return addToCart
        } catch (error) {
            console.log(error)
        }
    }
    
}