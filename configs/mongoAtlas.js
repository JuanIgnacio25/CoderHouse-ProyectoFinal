const mongoose = require('mongoose');

module.exports = {
    connection: null,
    connect: () => {
        if (this.connection) return this.connection;
        return mongoose.connect(process.env.MONGO_ATLAS_URL, {useUnifiedTopology: true,useNewUrlParser: true}).then(connection => {
            this.connection = connection;
            console.log('Conexion a DB exitosa');
        }).catch(err => console.log(err))
    }
}