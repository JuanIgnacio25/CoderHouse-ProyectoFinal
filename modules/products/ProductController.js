const { ProductService } = require("./ProductService")
const productService = new ProductService();
class ProductController {
    constructor() {

    }

    async getAllProducts(req, res) {
        const allProducts = await productService.getProducts();
        res.status(200).send(allProducts);
    }

    async getProduct(req, res) {
        //req.params.id == string
        const id = req.params.id;
        const productById = await productService.getProducts(id);
        res.status(200).send(productById);
    }

    async getByCategory(req,res) {
        const category = req.params.categoria;
        const matchedProducts = await productService.getByCategory(category);
        res.status(200).send(matchedProducts);
    }

    async createProduct(req, res) {
        const productToCreate = req.body;
        await productService.createProduct(productToCreate);
        res.status(201).send('producto creado exitosamente');
    }

    async updateProductById(req, res) {
        const product = req.body;
        const id = Number(req.params.id);
        await productService.updateProductById(id, product);
        res.status(200).send('producto actualizado exitosamente');
    }

    async deleteProductById(req,res) {
        const id = Number(req.params.id);
        await productService.deleteProductById(id);
        res.status(200).send('producto eliminado exitosamente');
    }
}

module.exports = {
    ProductController
}