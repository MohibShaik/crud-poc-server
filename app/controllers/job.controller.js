const jobService = require('../services/job-service');
const utils = require('../utilities/utils');

exports.saveNewJob = async function (request, response) {
  try {
    const userResponse = await jobService.saveNewJob(
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

exports.getAllJobs = async function (request, response) {
  try {
    const userResponse = await jobService.getAllJobs(
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
