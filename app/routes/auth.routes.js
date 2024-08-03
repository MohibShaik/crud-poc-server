const authController = require('../controllers/auth.controller');
var express = require('express');
var router = express.Router();
const { verifySignUp } = require('../middleware');

const loginRoute = (router) => {
  router.post(
    '/auth/signup',
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
    ],
    authController.saveNewUser
  );

  router.post(
    '/auth/signin',
    authController.signin
  );
};

exports.loginRoute = loginRoute;
