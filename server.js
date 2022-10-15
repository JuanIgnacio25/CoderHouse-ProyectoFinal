require('dotenv').config();

const express = require('express');

const logger = require('./middlewares/logger');
const {productRouter} = require('./modules/products/productRoutes');
const {cartRouter} = require('./modules/cart/cartRoutes');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger.info);



app.use('/productos', productRouter);
app.use('/carrito', cartRouter);

app.use(logger.errorRoute);
app.use(logger.catchError);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
