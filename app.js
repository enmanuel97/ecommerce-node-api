require('dotenv/config');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./src/helpers/jwt');
const errorHandler = require('./src/helpers/error-handler');
const routes = require('./src/routes');

const app = express();
const API_URL = process.env.API_URL;

// Middlewares
app.use(cors());
app.options('*', cors())
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

// Routes
app.use(`${API_URL}/categories`, routes.categoriesRoutes);
app.use(`${API_URL}/products`, routes.productsRoutes);
app.use(`${API_URL}/users`, routes.usersRoutes);
app.use(`${API_URL}/orders`, routes.ordersRoutes);

//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database Connection is ready...')
}).catch((err) => {
    console.log(err);
});

//Server
app.listen(3000, ()=>{
    console.log('server is running http://localhost:3000');
});