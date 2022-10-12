const {ProductoControlador} = require('./productoControlador');
const controlador = new ProductoControlador();
const routerProductos = require('express').Router();

routerProductos.get('/productos', controlador.getAllProducts);

routerProductos.get('/productos/:id', controlador.getProduct);

module.exports = {
    routerProductos
}