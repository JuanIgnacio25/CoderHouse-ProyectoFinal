const {OrdersService} = require('./OrdersService');
const ordersService = new OrdersService(process.env.NODE_ENV);

class OrdersController{

    async createNewOrder(req,res){
        try {
            const user = req.user;
            await ordersService.createNewOrder(user);
            res.redirect('/carrito');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    OrdersController
}