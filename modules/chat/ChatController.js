const { ChatService } = require('./ChatService');
const chatService = new ChatService(process.env.NODE_ENV);

class ChatController {

    handlerChat(req, res) {
        res.render('chat',{email:req.user.email});
    }

    async getOwnMessages(req,res){
        try {
            const email = req.params.email;
            const messages = await chatService.getMessagesByEmail(email);
            res.render('ownMessages', {messages:messages});
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    ChatController
}