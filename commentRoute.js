const route = require('express').Router();
const commentController = require('../controller/commentController');
const middleware = require('../middleware/authguard');

// Public routes
route.get('/page/:page', commentController.getCommentsByPage);

// Protected routes (require authentication)
route.post('/create', middleware.authGuard, commentController.createComment);

// Admin routes
route.get('/pending', middleware.authGuard, middleware.adminCheck, commentController.getPendingComments);
route.put('/status/:id', middleware.authGuard, middleware.adminCheck, commentController.updateCommentStatus);
route.delete('/:id', middleware.authGuard, middleware.adminCheck, commentController.deleteComment);

module.exports = route;