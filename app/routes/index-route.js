const express = require('express');
const loginRoute = require('./auth.routes');
const customerRoute = require('./customer.routes');
const userRoute = require('./user.routes');
const vendorRoute = require('./vendor.routes');
const empRoute = require('./employee.routes');
const jobRoute = require('./job.routes');

const routes = (router) => {
  loginRoute.loginRoute(router);
  customerRoute.customerRoute(router);
  userRoute.userRoute(router);
  vendorRoute.vendorRoute(router);
  empRoute.employeeRoutes(router);
  jobRoute.jobRoute(router);

  return router;
};

exports.routes = routes;
