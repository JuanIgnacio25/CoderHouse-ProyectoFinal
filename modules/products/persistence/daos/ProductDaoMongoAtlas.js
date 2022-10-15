const mongoose = require('mongoose');
const database = require('../../../../configs/mongoAtlas');
database.connect();

const productSchema = new mongoose.Schema({
    id: { type: Number },
    title: { type: String },
    price: { type: Number },
    category: { type: String },
    description: { type: String },
    stock: { type: Number },
    time_Stamp: { type: String }
});

let instance = null;

class ProductDaoMongoAtlas {
    constructor() {
        this.collection = mongoose.model('productos', productSchema);
    }

    static getInstance() {
        if (!instance) instance = new ProductDaoMongoAtlas();
        return instance;
    }

    async createId() {
        try {
            let id = 1
            const products = await this.getAllProducts();
            if (products.length > 0) {
                const i = products.length - 1
                id = (products[i].id) + 1
            }
            return id;
        } catch (error) {
        }
    }

    async validateIdProduct(id) {
        try {
        } catch (error) {
            console.log(error);
        }
    }

    async createProduct(productToAdd) {
        try {
            productToAdd.id = await this.createId();
            productToAdd.time_Stamp = new Date().toISOString();
            const newProduct = this.collection(productToAdd);
            await newProduct.save();
        } catch (error) {
            throw new Error('Algo salio mal al crear un producto');
        }
    }

    async getAllProducts() {
        try {
            return await this.collection.find();
        } catch (error) {
            console.log(error);
        }
    }

    async getProductsBy_Id(id) {
        try {
            return await this.collection.find({ _id: id });
        } catch (error) {
            throw new Error('El id ingresado es incorrecto');
        }
    }

    async getProductsByCategory(category) {
        try {
            return await this.collection.find({category:category});
        } catch (error) {
            console.log(error);
        }
    }

    async updateProductById(id,product) {
        try {
            const updateProduct = await this.collection.updateOne({ id: id }, { $set: { title: product.title, price: product.price, code: product.code, description: product.description, stock: product.stock } });;
            return updateProduct;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductById(id){
        try {
            const deleteProduct = await this.collection.findOneAndDelete({id:id});
            return deleteProduct;
        } catch (error) {
         console.log(error);
        }
    }
}

module.exports = {
    ProductDaoMongoAtlas
}