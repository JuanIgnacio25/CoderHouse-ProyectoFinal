const { UserDaoFactory } = require("./persistence/UserDaoFactory");
const { CartService } = require("../cart/CartService");
const bcrypt = require('bcrypt');
const {sendEmailNewOrder,sendEmailNewUser} = require('../../utils/nodemailer');


class UserService {
    constructor(type) {
        this.dao = new UserDaoFactory().getDao(type);
        this.cartService = new CartService(process.env.NODE_ENV);
    }

    async checkExistingUser(email){
        try {
            const userFound = await this.dao.findUser(email);
            if(userFound !== undefined) throw new Error('Usuario Existente');
        } catch (error) {
            throw error
        }
    }

    async saveNewUser(user) {
        try {
            await this.checkExistingUser(user.email);
            const encryptedPassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
            user.password = encryptedPassword;
            const createCartId = await this.cartService.createCart(user.email,user.address);
            user.cart_Id = createCartId;
            user.admin = false;
            sendEmailNewUser(process.env.ADMIN_EMAIL,process.env.RECEIVER_EMAIL,user);
            const newUser = await this.dao.saveNewUser(user);
            return newUser;
        } catch (error) {
            throw error
        }
    }

    async findUser(email){
        try {
            return await this.dao.findUser(email);
        } catch (error) {
            console.log(error);
        }
    }

    async updateCartId(user_Id,newCartId){
        try {
            await this.dao.updateCartId(user_Id,newCartId);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    UserService
}