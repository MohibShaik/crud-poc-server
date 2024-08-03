const vendorService = require('../services/vendor-service');
const authService = require('../services/auth-service');
const utils = require('../utilities/utils');

exports.getVendorById = async function (request, response) {
  try {
    const userResponse = await vendorService.getVendorById(
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

exports.saveNewVendor = async function (request, response) {
  try {
    const userResponse = await vendorService.saveNewVendor(
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
