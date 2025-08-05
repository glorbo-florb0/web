const route = require('express').Router();

const productController = require("../controller/productController");

route.get('/product-get',productController.productGet);
route.post('/product-create',productController.productPost);

module.exports = route;