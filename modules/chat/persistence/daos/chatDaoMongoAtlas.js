const database = require('../../../../configs/mongoAtlas');
const mongoose = require('mongoose');

database.connect();
const chatSchema = new mongoose.Schema({
    email: { type: String },
    time_Stamp: { type: String },
    message: { type: String }
})



let instance = null

class ChatDaoMongoAtlas {
    constructor() {
        this.collection = mongoose.model('mensajes', chatSchema);
    }

    static getInstance() {
        if (!instance) instance = new ChatDaoMongoAtlas();
        return instance;
    }

    async addMessage(message){
        try {
            const newMessage =  this.collection(message);
            await newMessage.save();
        } catch (error) {
            
        }
    }

    async getAllMessages(){
        try {
            return await this.collection.find();
        } catch (error) {
            console.log(error);
        }
    }

    async getMessagesByEmail(email){
        try {
            return await this.collection.find({email:email});
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    ChatDaoMongoAtlas
}