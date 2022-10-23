const { Console } = require('winston/lib/winston/transports');
const { UserService } = require('./UserService');
const userService = new UserService(process.env.NODE_ENV);

class UserController {
    constructor() {

    }

    renderLogin(req, res) {
        res.render('login');
    }

    renderSignIn(req, res) {
        res.render('signin');
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
            if (user.password !== user.verifiedPassword) return res.status(404).send('Las Contraseñas no coinciden');
            const userToAdd = {
                email: user.email,
                password: user.password,
                address: user.address,
                name: user.name
            }
            const newUser = await userService.saveNewUser(userToAdd);
            if (newUser) res.status(201).redirect('/login');
        } catch (error) {
            console.log(error);
            res.status(406).send(error.message);
        }
    }

    /*async loginUser(req,res){
        try {
            const token = await userService.logInUser(req.body);
            res.status(200).send(`Logeado exitosamente ${token}`);
        } catch (error) {
            res.status(404).send(error.message);
        }
    }*/


}

module.exports = {
    UserController
}