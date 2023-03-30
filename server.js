require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const Handlebars = require('handlebars');
const { engine } = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

const logger = require('./middlewares/logger');
const { productRouter } = require('./models/products/productRoutes');
const { cartRouter } = require('./models/cart/cartRoutes');
const { userRouter } = require('./models/user/UserRoutes');
const { ordersRouter } = require('./models/orders/ordersRoutes');
const { chatRouter } = require('./models/chat/chatRoutes');


const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const { socketServer } = require('./models/chat/socketServer');


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
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
app.use('/ordenes', ordersRouter);
app.use('/chat', chatRouter);

io.on('connection' , (socket) => {
    socketServer(io,socket);
}) 

app.use(logger.errorRoute);
app.use(logger.catchError);

const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
