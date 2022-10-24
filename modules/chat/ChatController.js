const {ChatService} = require('./ChatService');
const chatService = new ChatService(process.env.NODE_ENV);

class ChatController{
    
}

module.exports = {
    ChatController
}