const { ProductService } = require("./ProductService")
const productService = new ProductService(process.env.NODE_ENV);
const { logger } = require('../../utils/logger');
class ProductController {

    async handlerUpdate(req, res) {
        try {
            const id = req.params.id;
            const isAdmin = req.user.admin;
            await productService.checkExistingProduct(id);
            res.render('updateProduct', { id, isAdmin });
        } catch (error) {
            logger.error(error.message);
            res.render('error', { error: error.message });
        }
    }

    async getFormAdd(req, res) {
        try {
            res.render('addProduct');
        } catch (error) {
            console.log(error);
        }
    }

    async getAllProducts(req, res) {
        try {
            const products = await productService.getProducts();
            const isAdmin = req.user.admin;
            res.status(200).render('products', { isAdmin, products: products });
        } catch (error) {
            logger.error(error.message);
            res.render('error', { error: error.message });
        }
    }

    async getProduct(req, res) {
        try {
            const id = req.params.id;
            const productById = await productService.getProducts(id);
            res.status(200).render('products', { products: productById });
        } catch (error) {
            logger.error(error.message);
            res.render('error', { error: error.message });
        }
    }

    async getProductById(req, res) {
        try {
            const isAdmin = req.user.admin;
            const id = req.params.id;
            const productById = await productService.getProductsById(id);
            res.status(200).render('productProfile', { product: productById, isAdmin });
        } catch (error) {
            logger.error(error.message);
            res.render('error', { error: error.message });
        }
    }

    async getByCategory(req, res) {
        try {
            const category = req.params.categoria;
            const matchedProducts = await productService.getByCategory(category);
            res.status(200).render('products', { products: matchedProducts });
        } catch (error) {
            logger.error(error.message);
            res.render('error', { error: error.message });
        }
    }

    async createProduct(req, res) {
        try {
            const productToCreate = req.body;
            await productService.createProduct(productToCreate);
            res.status(201).redirect('/productos');
        } catch (error) {
            logger.error(error.message);
            res.render('error', { error: error.message });
        }
    }

    async updateProductById(req, res) {
        try {
            const product = req.body;
            const id = Number(req.params.id);
            await productService.updateProductById(id, product);
            res.status(200).redirect('/productos');
        } catch (error) {
            logger.error(error.message);
            res.render('error', { error: error.message });
        }
    }

    async deleteProductById(req, res) {
        try {
            const id = Number(req.body.id);
            await productService.deleteProductById(id);
            res.status(200).redirect('/productos');
        } catch (error) {
            logger.error(error.message);
            res.render('error', { error: error.message });
        }
    }
}

module.exports = {
    ProductController
}