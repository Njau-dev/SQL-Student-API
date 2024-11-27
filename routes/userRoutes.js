const express = require('express');
const routes = express.Router();
const userController = require('../controllers/userController');
const { verifyAccessToken } = require('../helpers/jwtHelpers');
const auth = require('../helpers/jwtHelpers')


routes.post('/register', userController.addUser);
routes.post('/login', userController.loginUser);
routes.get('/getallusers', verifyAccessToken, auth.restrict('user'), userController.getAllUsers)
routes.patch('/updateuser/:userId', verifyAccessToken, auth.restrict('user'), userController.updateUserRole)

module.exports = routes;


//