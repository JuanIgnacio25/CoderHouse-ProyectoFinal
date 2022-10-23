require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const Handlebars = require('handlebars');
const { engine } = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

const logger = require('./middlewares/logger');
const { productRouter } = require('./modules/products/productRoutes');
const { cartRouter } = require('./modules/cart/cartRoutes');
const { userRouter } = require('./modules/user/UserRoutes');


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(__dirname + '/public'));
app.use(logger.info);

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.set('views', './public/hbs_views');
app.set('view engine', 'hbs');


app.use('/', userRouter);
app.use('/productos', productRouter);
app.use('/carrito', cartRouter);

app.use(logger.errorRoute);
app.use(logger.catchError);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
