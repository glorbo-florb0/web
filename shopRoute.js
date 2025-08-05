const route = require('express').Router();
const shopController = require('../controller/shopController');
const middleware = require('../middleware/authguard');
const fileUpload = require('../middleware/multer');

// Public routes
route.get('/products', shopController.getAllProducts);
route.get('/products/category/:category', shopController.getProductsByCategory);
route.get('/products/:id', shopController.getProductById);

// Protected routes (require authentication)
route.post('/wishlist/add', middleware.authGuard, shopController.addToWishlist);
route.delete('/wishlist/:productId', middleware.authGuard, shopController.removeFromWishlist);
route.get('/wishlist', middleware.authGuard, shopController.getUserWishlist);
route.post('/orders/create', middleware.authGuard, shopController.createOrder);
route.get('/orders', middleware.authGuard, shopController.getUserOrders);

// Admin routes
route.post('/products/create', middleware.authGuard, middleware.adminCheck, fileUpload('image'), shopController.createProduct);
route.put('/products/:id', middleware.authGuard, middleware.adminCheck, fileUpload('image'), shopController.updateProduct);
route.delete('/products/:id', middleware.authGuard, middleware.adminCheck, shopController.deleteProduct);
route.get('/orders/all', middleware.authGuard, middleware.adminCheck, shopController.getAllOrders);
route.put('/orders/:id/status', middleware.authGuard, middleware.adminCheck, shopController.updateOrderStatus);

module.exports = route; 