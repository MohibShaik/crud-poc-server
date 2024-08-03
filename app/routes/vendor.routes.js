const vendorController = require('../controllers/vendor.controller');
var express = require('express');
var router = express.Router();

const vendorRoute = (router) => {
  router.get(
    '/vendors/:vendorId',
    vendorController.getVendorById
  );
  router.post('/vendors', vendorController.saveNewVendor);

  //   router.put('/users/:userId', userController.updateUser);

  //   router.delete('/users/:userId', userController.deleteUser);
};

exports.vendorRoute = vendorRoute;
