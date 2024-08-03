const userService = require('../services/user-service');
const authService = require('../services/auth-service');
const utils = require('../utilities/utils');

exports.getAllUsers = async function (request, response) {
  try {
    const userResponse = await userService.getAllUsers(
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

exports.saveNewUser = async function (request, response) {
  try {
    const userResponse = await authService.saveNewUser(
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

exports.updateUser = async function (request, response) {
  try {
    const userResponse = await userService.updateUser(
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

exports.deleteUser = async function (request, response) {
  try {
    const userResponse = await userService.deleteUser(
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

exports.getUserById = async function (request, response) {
  try {
    const userResponse = await userService.getUserById(
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
