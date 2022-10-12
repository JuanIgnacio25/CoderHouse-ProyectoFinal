const {ProductoDaoMongoAtlas} = require('./daos/productoDaoMongoAtlas');
const { ProductoDaoMongoDB } = require('./daos/productoDaoMongoDB');

class ProductoDaoFactory {
    getDao(type) {
        if (type === 'produccion') { return ProductoDaoMongoAtlas.getInstance() }
        else if (type === 'desarrollo') { return ProductoDaoMongoDB.getInstance() }
        else { console.error('error al conectar repositorio') }
    }
}

module.exports = {
    ProductoDaoFactory
}