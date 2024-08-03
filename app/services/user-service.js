const utils = require('../utilities/utils');
const userModel = require('../models/user.model');
const config = require('../config/auth.config');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

async function getAllUsers(request) {
  const userData = await userModel.find().lean();

  if (userData) {
    const successResponse = utils.successResposeBuilder(
      request,
      userData,
      200,
      'users retrieved successfully'
    );
    return successResponse;
  } else {
    const errorResponse = utils.errorResponseBuilder(
      request,
      userData,
      {
        status: 500,
        message: 'Something went wrong, Please try again',
      }
    );
    return errorResponse;
  }
}

async function getUserById(request) {
  const userData = await userModel
    .findById(request.params.userId)
    .lean();

  if (userData) {
    const successResponse = utils.successResposeBuilder(
      request,
      userData,
      200,
      'user info retrieved successfully'
    );
    return successResponse;
  } else {
    const errorResponse = utils.errorResponseBuilder(
      request,
      userData,
      {
        status: 500,
        message: 'Something went wrong, Please try again',
      }
    );
    return errorResponse;
  }
}

async function updateUser(request) {
  try {
    const filter = {
      _id: request.params.userId,
    };

    const updatedUserInfo =
      await userModel.findOneAndUpdate(
        filter,
        request.body,
        {
          new: true,
        }
      );
    const successResponse = utils.successResposeBuilder(
      request,
      updatedUserInfo,
      200,
      'User info updated successfully'
    );
    return successResponse;
  } catch (error) {
    const errorResponse = utils.errorResponseBuilder(
      request,
      [],
      error
    );
    return errorResponse;
  }
}

async function deleteUser(request) {
  try {
    const result = await userModel.findByIdAndDelete(
      request.params.userId
    );
    const successResponse = utils.successResposeBuilder(
      request,
      result,
      200,
      'User deleted successfully'
    );
    return successResponse;
  } catch (error) {
    const errorResponse = utils.errorResponseBuilder(
      request,
      [],
      error
    );
    return errorResponse;
  }
}
module.exports = {
  getAllUsers: getAllUsers,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getUserById: getUserById,
};
