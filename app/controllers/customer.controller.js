const custService = require('../services/customer-service');
const utils = require('../utilities/utils');

exports.saveNewCustomer = async function (
  request,
  response
) {
  try {
    const custResponse = await custService.saveNewCustomer(
      request
    );
    response
      .status(custResponse.statusCode)
      .send(custResponse);
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

exports.getAllCustomers = async function (
  request,
  response
) {
  try {
    const custResponse = await custService.getAllCustomers(
      request
    );
    response
      .status(custResponse.statusCode)
      .send(custResponse);
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

exports.updateCustomer = async function (
  request,
  response
) {
  try {
    const custResponse = await custService.updateCustomer(
      request
    );
    response
      .status(custResponse.statusCode)
      .send(custResponse);
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
