const mongoose = require('mongoose');
const database = require('../../../../configs/mongoAtlas');
database.connect();

const productSchema = new mongoose.Schema({
    id: { type: Number },
    title: { type: String },
    price: { type: Number },
    code: { type: Number },
    description: { type: String },
    stock: { type: Number },
    time_Stamp: { type: Number }
});

let instance = null;

class ProductoDaoMongoAtlas {
    constructor() {
        this.collection = mongoose.model('productos', productSchema);
    }

    static getInstance() {
        if (!instance) instance = new ProductoDaoMongoAtlas();
        return instance;
    }

    async crearIdProducto(){

    }

    async validarIdProducto(id){
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    async createProduct(){

    }

    async getAllProducts(){
        try {
            return await this.collection.find({});
        } catch (error) {
            console.log(error);
        }
    }

    async getProductsById(id){
        const productoFiltrado = productos.filter((prod) => prod.id == id);
        return productoFiltrado;
    }
}

module.exports = {
    ProductoDaoMongoAtlas
}