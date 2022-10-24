const chatRouter = require('express').Router();

const {authenticateToken} = require('../../middlewares/auth');
const {ChatController} = require('./ChatController');
const chatController =  new ChatController();


chatRouter.get('/',authenticateToken);

module.exports = {
    chatRouter
}