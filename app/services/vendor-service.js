const utils = require('../utilities/utils');
const userModel = require('../models/user.model');
const config = require('../config/auth.config');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const vendorModel = require('../models/vendor.model');

async function saveNewVendor(request) {
  const userData = await userModel
    .findOne({ email: request.body.email })
    .lean();
  if (userData) {
    const errorResponse = utils.errorResponseBuilder(
      request,
      userData,
      {
        status: 400,
        message: 'user already exists',
      }
    );
    return errorResponse;
  } else {
    const userObj = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      username: request.body.username,
      email: request.body.email,
      role: request.body.role,
      isActive: request.body.isActive,
      password: request.body.password
        ? bcrypt.hashSync(request.body.password, 8)
        : bcrypt.hashSync('Test123', 8),
    };

    let newUserInfo = new userModel(userObj);
    let userResult = await newUserInfo.save();

    if (userResult) {
      const vendorObj = {
        userId: userResult._id,
        companyName: request.body.companyName,
        phone: request.body.phone,
        address: request.body.address,
        createdBy: request.body.createdBy,
      };

      let newVendorInfo = new vendorModel(vendorObj);
      let result = await newVendorInfo.save();
      const successResponse = utils.successResposeBuilder(
        request,
        result,
        200,
        'vendor saved successfully'
      );
      return successResponse;
    }
  }
}

async function getVendorById(request) {
  const userData = await vendorModel
    .findById(request.params.vendorId)
    .populate('userId')
    .populate('createdBy')
    .lean();

  if (userData) {
    const successResponse = utils.successResposeBuilder(
      request,
      userData,
      200,
      'vendors retrieved successfully'
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
  saveNewVendor: saveNewVendor,
  getVendorById: getVendorById,
  //   getAllUsers: getAllUsers,
  //   updateUser: updateUser,
  //   deleteUser: deleteUser,
};
