const { UserDaoFactory } = require("./persistence/UserDaoFactory");
const { CartService } = require("../cart/CartService");
const bcrypt = require('bcrypt');
const { sendEmailNewUser, sendEmailPasswordRecovery } = require('../../utils/nodemailer');
const { logger } = require('../../utils/logger');
const jwt = require('jsonwebtoken');


class UserService {
    constructor(type) {
        this.dao = new UserDaoFactory().getDao(type);
        this.cartService = new CartService(process.env.NODE_ENV);
    }

    async checkExistingUser(email) {
        try {
            const userFound = await this.dao.findUser(email);
            if (userFound !== undefined) throw new Error('Usuario Existente');
        } catch (error) {
            throw error;
        }
    }

    checkValidFields(user) {
        if (user.email === undefined || user.email === '' || user.password === undefined || user.password === '' || user.name === undefined || user.name === '' || user.address === undefined || user.address === '') {
            throw new Error('Algun campo esta vacio o es invalido');
        }
    }

    async saveNewUser(user) {
        try {
            this.checkValidFields(user);
            await this.checkExistingUser(user.email);
            const encryptedPassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
            user.password = encryptedPassword;
            const createCartId = await this.cartService.createCart(user.email, user.address);
            user.cart_Id = createCartId;
            user.admin = false;
            sendEmailNewUser(process.env.ADMIN_EMAIL, process.env.RECEIVER_EMAIL, user);
            const newUser = await this.dao.saveNewUser(user);
            return newUser;
        } catch (error) {
            throw error;
        }
    }

    async findUser(email) {
        try {
            return await this.dao.findUser(email);
        } catch (error) {
            throw error;
        }
    }

    async findUserByToken(token) {
        try {
            return await this.dao.findUserByToken(token);
        } catch (error) {
            throw error;
        }
    }

    async updateCartId(user_Id, newCartId) {
        try {
            await this.dao.updateCartId(user_Id, newCartId);
        } catch (error) {
            throw error;
        }
    }

    async passwordRecovery(email) {
        try {
            const user = await this.dao.findUser(email);
            if (user) {
                const token = jwt.sign({ userId: user.id, userEmail: user.email }, process.env.JWT_SECRET, { expiresIn: '10m' });
                const recoveryLink = `https://ecommercejuanignaciocolli-nachocolli1.b4a.run/new-password/${token}`
                await this.dao.updateRecoveryToken(user.id, token);
                sendEmailPasswordRecovery(process.env.ADMIN_EMAIL, process.env.RECEIVER_EMAIL, recoveryLink);
            }
            return user;
        } catch (error) {
            throw error
        }
    }

    async changePassword(passwords, token) {
        try {
            //Verifico si la contraseña coincide con la segunda contraseña.
            if (!(passwords.password === passwords.verifiedPassword)) throw new Error('Las contraseñas no coinciden');

            const user = await this.findUserByToken(token);

            //Verifico que la contraseña no sea la misma que la actual.
            if (await bcrypt.compare(passwords.password, user.password)) throw new Error('La contraseña no puede ser igual a la anterior');

            const encryptedPassword = bcrypt.hashSync(passwords.password, bcrypt.genSaltSync(10));
            await this.dao.updatePassword(encryptedPassword, user.id);
        } catch (error) {
            throw error;
        }

    }
}


module.exports = {
    UserService
}