const { UserService } = require('./UserService');
const userService = new UserService(process.env.NODE_ENV);
const { logger } = require('../../utils/logger');

class UserController {
    constructor() {

    }

    renderLogin(req, res) {
        res.render('login');
    }

    renderSignIn(req, res) {
        res.render('signin');
    }

    renderForgotPassword(req, res) {
        res.render('forgotPassword');
    }

    renderNewPassword(req, res) {
        const token = req.params.token;
        res.render('changePassword', { token });
    }

    rootHandler(req, res) {
        res.redirect('/productos');
    }

    logoutHandler(req, res) {
        res.clearCookie('token');
        res.redirect('/login');
    }

    loginHandler(req, res) {
        res.redirect('/productos');
    }

    async saveNewUser(req, res) {
        try {
            const user = req.body;
            if (user.password !== user.verifiedPassword) throw new Error('Las Contraseñas no coinciden');
            const userToAdd = {
                email: user.email,
                password: user.password,
                address: user.address,
                name: user.name
            }
            const newUser = await userService.saveNewUser(userToAdd);
            if (newUser) res.status(201).redirect('/login');
        } catch (error) {
            logger.error(error.message);
            res.render('error', { error: error.message });
        }
    }

    async forgotPassword(req, res) {
        try {
            const email = req.body.email;
            const user = await userService.passwordRecovery(email);
            if (user) res.status(200).redirect('/login');
        } catch (error) {
            logger.error(error.message);
            res.render('error', { error: error.message });
        }
    }

    async newPassword(req, res) {
        try {
            const passwords = req.body;
            const token = req.params.token;
            await userService.changePassword(passwords, token);
            res.redirect('/login');
        } catch (error) {
            logger.error(error.message);
            res.render('error', { error: error.message });
        }
    }

}

module.exports = {
    UserController
}