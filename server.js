require('dotenv').config();

const express = require('express');


const {routerProductos} = require('./modules/productos/productoRutas');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routerProductos);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
