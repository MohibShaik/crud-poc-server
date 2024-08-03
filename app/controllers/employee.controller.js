const empService = require('../services/emp-service');
const utils = require('../utilities/utils');

exports.getEmpById = async function (request, response) {
  try {
    const userResponse = await empService.getEmpById(
      request
    );
    response
      .status(userResponse.statusCode)
      .send(userResponse);
  } catch (error) {
    const errorResponse = utils.errorResponseBuilder(
      request,
      response,
      error
    );
    response
      .status(errorResponse.statusCode)
      .send(errorResponse);
  }
};

exports.saveNewEmp = async function (request, response) {
  try {
    const userResponse = await empService.saveNewEmp(
      request
    );
    response
      .status(userResponse.statusCode)
      .send(userResponse);
  } catch (error) {
    const errorResponse = utils.errorResponseBuilder(
      request,
      response,
      error
    );
    response
      .status(errorResponse.statusCode)
      .send(errorResponse);
  }
};

exports.getAllEmp = async function (request, response) {
  try {
    const userResponse = await empService.getAllEmp(
      request
    );
    response
      .status(userResponse.statusCode)
      .send(userResponse);
  } catch (error) {
    const errorResponse = utils.errorResponseBuilder(
      request,
      response,
      error
    );
    response
      .status(errorResponse.statusCode)
      .send(errorResponse);
  }
};

exports.updateEmpAvailability = async function (request, response) {
  try {
    const userResponse = await empService.updateEmpAvailability(
      request
    );
    response
      .status(userResponse.statusCode)
      .send(userResponse);
  } catch (error) {
    const errorResponse = utils.errorResponseBuilder(
      request,
      response,
      error
    );
    response
      .status(errorResponse.statusCode)
      .send(errorResponse);
  }
};

// exports.updateUser = async function (request, response) {
//   try {
//     const userResponse = await vendorService.updateUser(
//       request
//     );
//     response
//       .status(userResponse.statusCode)
//       .send(userResponse);
//   } catch (error) {
//     const errorResponse = utils.errorResponseBuilder(
//       request,
//       response,
//       error
//     );
//     response
//       .status(errorResponse.statusCode)
//       .send(errorResponse);
//   }
// };

// exports.deleteUser = async function (request, response) {
//   try {
//     const userResponse = await vendorService.deleteUser(
//       request
//     );
//     response
//       .status(userResponse.statusCode)
//       .send(userResponse);
//   } catch (error) {
//     const errorResponse = utils.errorResponseBuilder(
//       request,
//       response,
//       error
//     );
//     response
//       .status(errorResponse.statusCode)
//       .send(errorResponse);
//   }
// };
