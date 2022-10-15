const database = require('../../../../configs/mongoAtlas');
database.connect();
const mongoose = require('mongoose');

mongoose.Schema({
    id: {type:Number},
    email: {type:String},
    time_Stamp: {type:String},
    delivery_Address: {type:String},
    items: {type:String}
})

let instance = null

class CartDaoMongoAtlas{
    static getInstance(){
        if(!instance) instance = new CartDaoMongoAtlas();
        return instance;
    }
}

module.exports = {
    CartDaoMongoAtlas
}