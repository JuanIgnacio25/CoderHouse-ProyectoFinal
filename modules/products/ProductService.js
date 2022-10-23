const { ProductDaoFactory } = require("./persistence/productDaoFactory")

class ProductService {
    constructor(type) {
        this.dao = new ProductDaoFactory().getDao(type);
    }

    async getProducts(id) {
        try {
            if (id) return await this.dao.getProductsBy_Id(id);
            return await this.dao.getAllProducts();
        } catch (error) {
            console.log(error);
        }
    }

    async getProductsById(id){
        try {
            return (await this.dao.getProductsById(id))[0];
        } catch (error) {
            console.log(error);
        }
    }

    async getByCategory(category){
        try {
            return await this.dao.getProductsByCategory(category);
        } catch (error) {
            console.log(error);
        }
    }

    async createProduct(product) {
        try {
            await this.dao.createProduct(product);
        } catch (error) {
            console.log(error);
        }

    }

    async updateProductById(id,product){
        try {
            return await this.dao.updateProductById(id,product);
        } catch (error) {
            console.log(error);
        }    
    }

    async deleteProductById(id){
        try {
            return await this.dao.deleteProductById(id);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    ProductService
}