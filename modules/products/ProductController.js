const { ProductService } = require("./ProductService")
const productService = new ProductService(process.env.NODE_ENV);
class ProductController {
    constructor() {

    }

    handlerUpdate(req,res){
        const id = req.params.id;
        const isAdmin = req.user.admin;
        res.render('updateProduct',{id,isAdmin});
    }

    async getAllProducts(req, res) {
        const products = await productService.getProducts();
        const isAdmin = req.user.admin;
        if(!isAdmin) res.status(200).render('products',{products:products});
        else res.status(200).render('productsAndForm',{isAdmin,products:products});
    }

    async getProduct(req, res) {
        //req.params.id == string
        const id = req.params.id;
        const productById = await productService.getProducts(id);
        res.status(200).render('products',{products:productById});
    }

    async getByCategory(req,res) {
        const category = req.params.categoria;
        const matchedProducts = await productService.getByCategory(category);
        res.status(200).render('products',{products:matchedProducts});
    }

    async createProduct(req, res) {
        const productToCreate = req.body;
        await productService.createProduct(productToCreate);
        res.status(201).redirect('/productos');
    }

    async updateProductById(req, res) {
        const product = req.body;
        const id = Number(req.params.id);
        await productService.updateProductById(id, product);
        res.status(200).redirect('/productos');
    }

    async deleteProductById(req,res) {
        const id = Number(req.params.id);
        await productService.deleteProductById(id);
        res.status(200).redirect('/productos');
    }
}

module.exports = {
    ProductController
}