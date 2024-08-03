const customerController = require('../controllers/customer.controller');
var express = require('express');
var router = express.Router();

const customerRoute = (router) => {
  router.post(
    '/customers',
    customerController.saveNewCustomer
  );

  router.get(
    '/customers',
    customerController.getAllCustomers
  );

  router.put(
    '/customers/:customerId',
    customerController.updateCustomer
  );
};

exports.customerRoute = customerRoute;
