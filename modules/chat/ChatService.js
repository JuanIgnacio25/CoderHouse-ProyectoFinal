const { ChatDaoFactory } = require("./persistence/ChatDaoFactory");

class ChatService {
    constructor(type) {
        this.dao = new ChatDaoFactory().getDao(type);
    }

    async addMessage(message) {
        try {
            const day = new Date().toLocaleDateString('es-AR', {timeZone: "America/Argentina/Buenos_Aires"});
            const hour = new Date().toLocaleTimeString('es-AR', {timeZone: "America/Argentina/Buenos_Aires"}).slice(0, 5);
            message.time_Stamp = `${hour} `.concat(day);
            return await this.dao.addMessage(message);
        } catch (error) {
            console.log(error);
        }
    }

    async getAllMessages() {
        try {
            return await this.dao.getAllMessages();
        } catch (error) {
            console.log(error);
        }
    }

    async getMessagesByEmail(email) {
        try {
            return await this.dao.getMessagesByEmail(email);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    ChatService
}