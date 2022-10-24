const { CartService } = require("../cart/CartService");
const { OrdersDaoFactory } = require("./persistence/ordersDaoFactory")
const {sendEmailNewOrder} = require('../../utils/nodemailer');
const { UserService } = require("../user/UserService");

class OrdersService {
    constructor(type) {
        this.dao = new OrdersDaoFactory().getDao(type);
        this.cartService = new CartService(process.env.NODE_ENV);
        this.userService = new UserService(process.env.NODE_ENV);
    }

    async createNewOrder(user){
        try {
            const cart = await this.cartService.getCartById(user.cart_Id);
            const order = {
                email: user.email,
                items: cart.items,
                time_Stamp: new Date().toISOString(),
                delivery_Address: cart.delivery_Address,
                state: "Generated",
                total_Price: cart.total_Price
            }
            const createOrder = await this.dao.createNewOrder(order);
            if(createOrder){
                await this.cartService.deleteCartById(user.cart_Id);
                const newCartId = await this.cartService.createCart(user.email,user.address);
                await this.userService.updateCartId(user.id,newCartId);
                sendEmailNewOrder(process.env.ADMIN_EMAIL, process.env.RECEIVER_EMAIL, order);
            }
            return createOrder.id;
            
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    OrdersService
}