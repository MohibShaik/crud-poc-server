const utils = require('../utilities/utils');
const userModel = require('../models/user.model');
const config = require('../config/auth.config');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const vendorModel = require('../models/vendor.model');
const jobModel = require('../models/job.model');
const pagedResult = require('../utilities/pagination/paged-result');
const { ObjectId } = require('mongodb');
// const moment = require('moment-timezone');
const moment = require('moment');

async function saveNewJob(request) {
  try {
    let newJobInfo = new jobModel(request.body);
    let jobResult = await newJobInfo.save();

    if (jobResult) {
      const successResponse = utils.successResposeBuilder(
        request,
        jobResult,
        200,
        'New job published successfully'
      );
      return successResponse;
    } else {
      const errorResponse = utils.errorResponseBuilder(
        request,
        {},
        {
          status: 400,
          message:
            'Something went wrong while publishing a job, Please try again',
        }
      );
      return errorResponse;
    }
  } catch (error) {
    const errorResponse = utils.errorResponseBuilder(
      request,
      {},
      {
        status: 400,
        message:
          'Something went wrong while publishing a job, Please try again',
      }
    );
    return errorResponse;
  }
}

async function getAllJobs(request) {
  let query = [
    {
      $match: {
        $and: [
          request.body.vendorId
            ? {
                createdBy: new ObjectId(
                  request.body.vendorId
                ),
              }
            : {},

          request.body.workPlaceType?.length
            ? {
                workPlaceType: {
                  $in: request.body.workPlaceType,
                },
              }
            : {},

          request.body.jobType?.length
            ? {
                jobType: {
                  $in: request.body.jobType,
                },
              }
            : {},

          request.body.department?.length
            ? {
                department: {
                  $in: request.body.department,
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
        localField: 'createdBy',
        foreignField: '_id',
        as: 'jobPosterInfo',
      },
    },
    {
      $lookup: {
        from: 'vendors',
        localField: 'hiringManager',
        foreignField: '_id',
        as: 'hiringManagerInfo',
      },
    },
  ];

  let tquery = [
    {
      $match: {
        $and: [
          request.body.vendorId
            ? {
                createdBy: new ObjectId(
                  request.body.vendorId
                ),
              }
            : {},

          request.body.workPlaceType?.length
            ? {
                workPlaceType: {
                  $in: request.body.workPlaceType,
                },
              }
            : {},

          request.body.jobType?.length
            ? {
                jobType: {
                  $in: request.body.jobType,
                },
              }
            : {},

          request.body.department?.length
            ? {
                department: {
                  $in: request.body.department,
                },
              }
            : {},
        ],
      },
    },
    {
      $count: 'rowCount',
    },
  ];

  const jobsList = await jobModel.aggregate(query);
  const totalRows = await jobModel.aggregate(tquery);

  const successResponse = utils.successResposeBuilder(
    request,
    pagedResult(
      jobsList,
      totalRows.length ? totalRows[0].rowCount : 0
    ),
    200,
    'Jobs data retrieved successfully'
  );

  return successResponse;
}

module.exports = {
  saveNewJob: saveNewJob,
  getAllJobs: getAllJobs,
};
