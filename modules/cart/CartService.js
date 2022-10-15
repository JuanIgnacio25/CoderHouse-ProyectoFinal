const { CartDaoFactory } = require("./persistence/cartDaoFactory");

class CartService{
    constructor(){
        this.dao = new CartDaoFactory();
    }

}

module.exports = {
    CartService
}