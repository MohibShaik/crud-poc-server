const employeeController = require('../controllers/employee.controller');
var express = require('express');
var router = express.Router();

const employeeRoutes = (router) => {
  router.get(
    '/employees/:empId',
    employeeController.getEmpById
  );
  router.post('/employees', employeeController.getAllEmp);
  router.post('/saveNewEmp', employeeController.saveNewEmp);
  router.post(
    '/updateEmpAvailability',
    employeeController.updateEmpAvailability
  );

  // router.put('/users/:userId', userController.updateUser);

  // router.delete(
  //   '/users/:userId',
  //   userController.deleteUser
  // );
};

exports.employeeRoutes = employeeRoutes;
