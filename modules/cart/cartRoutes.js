const cartRouter = require('express').Router();
const {} = require('./CartController');

cartRouter.get('/');

module.exports = {
    cartRouter
}