const route = require('express').Router();
const correctionController = require('../controller/correctionController');
const middleware = require('../middleware/authguard');

// Protected routes (require authentication)
route.post('/create', middleware.authGuard, correctionController.createCorrection);

// Admin routes
route.get('/all', middleware.authGuard, middleware.adminCheck, correctionController.getAllCorrections);
route.get('/status/:status', middleware.authGuard, middleware.adminCheck, correctionController.getCorrectionsByStatus);
route.put('/status/:id', middleware.authGuard, middleware.adminCheck, correctionController.updateCorrectionStatus);
route.delete('/:id', middleware.authGuard, middleware.adminCheck, correctionController.deleteCorrection);

module.exports = route; 