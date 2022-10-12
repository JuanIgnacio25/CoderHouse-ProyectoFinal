const { ProductoServicio } = require("./ProductoServicio")
const servicio = new ProductoServicio();
class ProductoControlador {
    constructor(){
        
    }
    
    async getAllProducts(req,res){
        const allProducts = await servicio.getProducts();
        res.status(200).send(allProducts);
    }

    async getProduct(req,res){
        //req.params.id == string
        const id =  req.params.id;
        const productById = await servicio.getProducts(id);
        res.status(200).send(productById);
    }
}

module.exports = {
    ProductoControlador
}