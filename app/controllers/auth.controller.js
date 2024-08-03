const utils = require('../utilities/utils');
const authService = require('../services/auth-service');

exports.saveNewUser = async function (request, response) {
  try {
    const saveUserResponse = await authService.saveNewUser(
      request
    );
    response
      .status(saveUserResponse.statusCode)
      .send(saveUserResponse);
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

exports.signin = async function (request, response) {
  try {
    const loginResponse = await authService.login(
      request
    );
    response
      .status(loginResponse.statusCode)
      .send(loginResponse);
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
