const { authenticateToken } = require('../../middlewares/auth');
const { OrdersController } = require('./ordersController');
const ordersController = new OrdersController();

const ordersRouter = require('express').Router();

ordersRouter.post('/buy',authenticateToken,ordersController.createNewOrder);

module.exports = {
    ordersRouter
}