const {ProductController} = require('./ProductController');
const productController = new ProductController();
const productRouter = require('express').Router();

productRouter.get('/', productController.getAllProducts);
productRouter.get('/:categoria', productController.getByCategory);
productRouter.get('/:id', productController.getProduct);


productRouter.post('/',productController.createProduct);

productRouter.put('/:id',productController.updateProductById);

productRouter.delete('/:id',productController.deleteProductById);

module.exports = {
    productRouter
}