const userRouter = require('express').Router();
const { UserController } = require('./UserController');
const userController = new UserController();
const { authenticationCheck, authenticateToken, checkRecoveryToken } = require('../../middlewares/auth');

userRouter.get('/', authenticateToken, userController.rootHandler);
userRouter.get('/login', authenticateToken, userController.renderLogin);
userRouter.get('/signin', authenticateToken, userController.renderSignIn);
userRouter.get('/logout', authenticateToken, userController.logoutHandler);
userRouter.get('/forgot-password', userController.renderForgotPassword);
userRouter.get('/new-password/:token', checkRecoveryToken, userController.renderNewPassword);

userRouter.post('/signin', userController.saveNewUser);
userRouter.post('/login', authenticationCheck, userController.loginHandler);
userRouter.post('/forgot-password', userController.forgotPassword);
userRouter.post('/new-password/:token', checkRecoveryToken, userController.newPassword);

module.exports = {
    userRouter
}