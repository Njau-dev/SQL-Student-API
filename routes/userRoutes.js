const express = require('express');
const routes = express.Router();
// const { verifyAccessToken } = require('../helpers/jwtHelpers');
const userController = require('../controllers/userController');


// add a user (REGISTER) to the DB
routes.post('/register', userController.addUser);

// login a user
routes.post('/login', userController.loginUser);

// get all users
routes.get('/getallusers', userController.getAllUsers)


module.exports = routes;