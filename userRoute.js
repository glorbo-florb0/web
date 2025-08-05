const route = require('express').Router();
const middleware = require('../middleware/authguard')
const userController = require('../controller/userController');
const fileUpload = require('../middleware/multer');

route.post('/register', fileUpload('image'),userController.createUser);
route.post('/login',userController.loginUser);
route.post('/admin/login',userController.adminLogin);
route.put('/updateUser',middleware.authGuard,fileUpload('image'),userController.updateUser);
route.get('/getUsers', middleware.authGuard,middleware.adminCheck,userController.getAllUsers);
route.get('/admin/dashboard', middleware.authGuard, middleware.adminCheck, userController.getAdminDashboard);

module.exports = route;