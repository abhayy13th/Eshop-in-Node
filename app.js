const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors');


require("dotenv/config");

const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/errorhandler')

app.use(cors())
app.options('*',cors())
const api = process.env.API_URL;

//Routers
const routerProducts = require('./routers/products')
const routerCategories = require('./routers/categories')
const routerOrders = require('./routers/orders')
const routerUsers = require('./routers/users');


//Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use('/public/uploads',express.static(__dirname + '/public/uploads'));
app.use(errorHandler)


//apis
app.use(`${api}/products`,routerProducts)
app.use(`${api}/users`,routerUsers)
app.use(`${api}/orders`,routerOrders)
app.use(`${api}/categories`,routerCategories)


//connect to database
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("database is ready..");
  })
  .catch((err) => {
    console.log(err);
  });

  const PORT = process.env.PORT || 3000;
  //Server
app.listen(3000, () => {
  console.log(api);
  console.log(" Server is running at http://localhost:3000/");
});
