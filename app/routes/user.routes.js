const userController = require('../controllers/user.controller');
var express = require('express');
var router = express.Router();

const userRoute = (router) => {
  router.get('/users', userController.getAllUsers);
  router.get('/users/:userId', userController.getUserById);

  router.post('/users', userController.saveNewUser);

  router.put('/users/:userId', userController.updateUser);

  router.delete(
    '/users/:userId',
    userController.deleteUser
  );
};

exports.userRoute = userRoute;
