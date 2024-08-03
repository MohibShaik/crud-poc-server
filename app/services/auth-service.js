const utils = require('../utilities/utils');
const userModel = require('../models/user.model');
const vendorModel = require('../models/vendor.model');
const employeeModel = require('../models/employee.model');
const config = require('../config/auth.config');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

async function saveNewUser(request) {
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
      email: request.body.email,
      role: request.body.role,
      isActive: request.body.isActive,
      password: request.body.password
        ? bcrypt.hashSync(request.body.password, 8)
        : bcrypt.hashSync('Test123', 8),
    };

    let newUserInfo = new userModel(userObj);
    let result = await newUserInfo.save();
    const successResponse = utils.successResposeBuilder(
      request,
      result,
      200,
      'user saved successfully'
    );
    return successResponse;
  }
}

async function login(request) {
  const userData = await userModel
    .findOne({ email: request.body.emailAddress })
    .lean();
  if (userData) {
    var passwordIsValid = bcrypt.compareSync(
      request.body.password,
      userData.password
    );

    if (!passwordIsValid) {
      const errorResponse = utils.errorResponseBuilder(
        request,
        userData,
        {
          status: 401,
          message: 'Invalid Password!',
        }
      );
      return errorResponse;
    }

    const token = jwt.sign(
      { id: userData.id },
      config.secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      }
    );

    userData.accessToken = token;

    const successResponse = utils.successResposeBuilder(
      request,
      userData,
      200,
      'user login successfull'
    );
    return successResponse;
  } else {
    const errorResponse = utils.errorResponseBuilder(
      request,
      userData,
      {
        status: 404,
        message: 'User Not found.',
      }
    );
    return errorResponse;
  }
}

module.exports = {
  saveNewUser: saveNewUser,
  login: login,
};
