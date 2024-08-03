const utils = require('../utilities/utils');
const userModel = require('../models/user.model');
const config = require('../config/auth.config');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const vendorModel = require('../models/vendor.model');
const empModel = require('../models/employee.model');
const pagedResult = require('../utilities/pagination/paged-result');
const { ObjectId } = require('mongodb');
// const moment = require('moment-timezone');
const moment = require('moment');

async function saveNewEmp(request) {
  const userData = await userModel
    .findOne({ email: request.body.email })
    .lean();
  if (userData) {
    const errorResponse = utils.errorResponseBuilder(
      request,
      userData,
      {
        status: 400,
        message: 'Employee already exists',
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
      const tempEmpCode = generateEmployeeCode(
        request.body.firstName,
        request.body.lastName
      );

      // const tempAvailabilityStatus = generateEmployeeCode(
      //   request.body.firstName,
      //   request.body.lastName
      // );

      const empObj = {
        userId: userResult._id,
        vendorId: request.body.vendorId,
        skills: request.body.skills,
        experience: request.body.experience,
        visaStatus: request.body.visaStatus,
        designation: request.body.designation,
        address: request.body.address,
        city: request.body.city,
        state: request.body.state,
        empCode: tempEmpCode,
        availabilityStatus: 'unavailable',
      };

      let newEmpInfo = new empModel(empObj);
      let result = await newEmpInfo.save();
      const successResponse = utils.successResposeBuilder(
        request,
        result,
        200,
        'Employee saved successfully'
      );
      return successResponse;
    }
  }
}

function generateEmployeeCode(firstName, lastName) {
  if (firstName.length < 2 || lastName.length < 2) {
    throw new Error(
      'First name and last name must each be at least two characters long.'
    );
  }
  const firstTwoFirstName = firstName
    .substring(0, 2)
    .toUpperCase();
  const firstTwoLastName = lastName
    .substring(0, 2)
    .toUpperCase();

  const randomFourDigits = Math.floor(
    1000 + Math.random() * 9000
  ); // ensures a 4-digit number

  return (
    firstTwoFirstName + firstTwoLastName + randomFourDigits
  );
}

async function getEmpById(request) {
  const userData = await empModel
    .findById(request.params.empId)
    .populate('userId')
    .populate('vendorId')
    .lean();

  if (userData) {
    const successResponse = utils.successResposeBuilder(
      request,
      userData,
      200,
      'Employee info retrieved successfully'
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

async function getAllEmp(request) {
  let query = [
    {
      $match: {
        $and: [
          request.body.vendorId
            ? {
                vendorId: new ObjectId(
                  request.body.vendorId
                ),
              }
            : {},

          request.body.availabilityFilterOption
            ? {
                availabilityStatus:
                  request.body.availabilityFilterOption,
              }
            : {},

          request.body.searchKey
            ? {
                firstName: {
                  $regex: request.body.searchKey,
                  $options: 'i',
                },
              }
            : {},
        ],
      },
    },
    {
      $skip:
        Number(request.query.pageIndex) *
        Number(request.query.pageSize),
    },
    { $limit: Number(request.query.pageSize) },
    {
      $sort: {
        createdAt: 1,
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'userInfo',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'vendorId',
        foreignField: '_id',
        as: 'vendorInfo',
      },
    },
  ];

  let tquery = [
    {
      $match: {
        $and: [
          request.body.vendorId
            ? {
                vendorId: new ObjectId(
                  request.body.vendorId
                ),
              }
            : {},
        ],
      },
    },
    {
      $count: 'rowCount',
    },
  ];

  const empData = await empModel.aggregate(query);
  const totalRows = await empModel.aggregate(tquery);

  const successResponse = utils.successResposeBuilder(
    request,
    pagedResult(
      empData,
      totalRows.length ? totalRows[0].rowCount : 0
    ),
    200,
    'Employees data retrieved successfully'
  );

  return successResponse;

  // const userData = await empModel
  //   .find()
  //   .populate('userId')
  //   .populate('vendorId')
  //   .lean();

  // if (userData) {
  //   const successResponse = utils.successResposeBuilder(
  //     request,
  //     userData,
  //     200,
  //     'Employees list retrieved successfully'
  //   );
  //   return successResponse;
  // } else {
  //   const errorResponse = utils.errorResponseBuilder(
  //     request,
  //     userData,
  //     {
  //       status: 500,
  //       message: 'Something went wrong, Please try again',
  //     }
  //   );
  //   return errorResponse;
  // }
}

async function updateEmpAvailability(request) {
  try {
    const empData = await empModel
      .findById(request.body.empId)
      .lean();

    // Convert the local date to UTC
    const utcStartDate = moment(
      request.body.dates[0]?.startDate
    ).utc();
    const utcEndDate = moment(
      request.body.dates[0]?.endDate
    ).utc();

    const datesObj = [
      {
        startDate: utcStartDate,
        endDate: utcEndDate,
      },
    ];

    if (empData) {
      const result = await empModel.findOneAndUpdate(
        { _id: request.body.empId },
        { $push: { datesLog: datesObj } },
        { new: true, useFindAndModify: false }
      );

      const tempResult = await modifyEmpAvailability(
        request,
        result
      );

      if (result) {
        const successResponse = utils.successResposeBuilder(
          request,
          result,
          200,
          'Employee info retrieved successfully'
        );
        return successResponse;
      } else {
        const errorResponse = utils.errorResponseBuilder(
          request,
          result,
          {
            status: 500,
            message:
              'Something went wrong, Please try again',
          }
        );
        return errorResponse;
      }
    }
  } catch (error) {
    const errorResponse = utils.errorResponseBuilder(
      request,
      result,
      {
        status: 500,
        message: 'Something went wrong, Please try again',
      }
    );
    return errorResponse;
  }

  async function modifyEmpAvailability(request, empData) {
    const currentDateUTC = moment.utc();

    const empStartDateUTC = moment.utc(
      empData.datesLog[empData.datesLog?.length - 1]
        ?.startDate
    );

    if (currentDateUTC.isBefore(empStartDateUTC)) {
      const result = await empModel.findOneAndUpdate(
        { _id: request.body.empId },
        { $set: { availabilityStatus: 'unavailable' } },
        { new: true, useFindAndModify: false }
      );

      return result;
    } else if (currentDateUTC.isAfter(empStartDateUTC)) {
      const result = await empModel.findOneAndUpdate(
        { _id: request.body.empId },
        { $set: { availabilityStatus: 'available' } },
        { new: true, useFindAndModify: false }
      );

      return result;
    } else if (currentDateUTC.isSame(empStartDateUTC)) {
      const result = await empModel.findOneAndUpdate(
        { _id: request.body.empId },
        { $set: { availabilityStatus: 'available' } },
        { new: true, useFindAndModify: false }
      );

      return result;
    }
  }
}

module.exports = {
  saveNewEmp: saveNewEmp,
  getEmpById: getEmpById,
  getAllEmp: getAllEmp,
  updateEmpAvailability: updateEmpAvailability,
};
