const { ProductoDaoFactory } = require("./persistencia/productoDaoFactory")

class ProductoServicio {
    constructor() {
        this.dao = new ProductoDaoFactory().getDao(process.env.NODE_ENV);
    }

    async getProducts(id) {
        try {
            if (id) return await this.dao.getProductsById(id);
            return await this.dao.getAllProducts();
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    ProductoServicio
}