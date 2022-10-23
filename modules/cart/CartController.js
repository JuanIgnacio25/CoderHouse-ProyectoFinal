const {CartService} = require('./CartService');
const cartService = new CartService(process.env.NODE_ENV);
const logger = require('../../utils/logger');

class CartController{

    async createCart(req,res){
        const email = req.body.email;
        const delivery_Address = req.body.delivery_Address;
        await cartService.createCart(email,delivery_Address);
        res.status(201).send('carrito creado exitosamente');
    }

    async getAllCarts(req,res){
        const carts = await cartService.getAllCarts();
        res.send(carts);
    }

    async getCart(req,res){
        try {
            const cart_Id = req.user.cart_Id;
            const cart = await cartService.getCartById(cart_Id);
            const products = cart.items;
            res.render('cart',{products:products});
        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCart(req,res){
        try {
            const cart_Id = req.user.id;
            const product_Id = req.params.id;
            const quantity = req.body.quantity;
            await cartService.addProductToCart(cart_Id,product_Id,quantity);
            res.redirect('/carrito');
        } catch (error) {
            console.log(error);
            logger.error(error.message);
        }
    }

    async removeProductosFormCart(req,res){
        try {
            const product_id = req.params.id;
            const cart_id = req.user.cart_Id;
            await cartService.removeProductFromCartById(product_id,cart_id);
            res.status(200).redirect('/carrito');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    CartController
}