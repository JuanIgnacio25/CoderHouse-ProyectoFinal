const { ProductService } = require("../products/ProductService");
const { CartDaoFactory } = require("./persistence/cartDaoFactory");

class CartService {
    constructor(type) {
        this.dao = new CartDaoFactory().getDao(type);
        this.productService = new ProductService(process.env.NODE_ENV);
    }

    async createCart(email, delivery_Address) {
        let cartToCreate = {
            email: email,
            delivery_Address: delivery_Address,
            items: [],
            time_Stamp: new Date().toISOString()
        }
        const idCart = await this.dao.createCart(cartToCreate);
        return idCart;
    }

    async getAllCarts() {
        return await this.dao.getAllCarts();
    }

    async getCartById(id) {
        try {
            return (await this.dao.getCartById(id))[0];
        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCart(cart_Id, product_Id, quantity) {
        try {
            const product = await this.productService.getProductsById(product_Id);
            const { _id, id, title, price, category, description, thumbnail } = product
            const productToAdd = {
                _id ,id, title, price, category, description, thumbnail,quantity
            }
            const cartToUpdate = await this.getCartById(cart_Id);
            cartToUpdate.items.push(productToAdd);
            await this.dao.updateCart(cart_Id, cartToUpdate);
        } catch (error) {
            console.log(error);
        }
    }

    async removeProductFromCartById(product_Id,cart_Id) {
        try {
            const cart = await this.getCartById(cart_Id);
            const modifiedItems = cart.items.filter((item) => item.id != parseInt(product_Id));
            cart.items = modifiedItems;
            return await this.dao.updateCart(cart_Id,cart);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    CartService
}