const utils = require('../utilities/utils');
const custModel = require('../models/customer.model');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

async function saveNewCustomer(request) {
  const customerData = await custModel
    .findOne({ email: request.body.email })
    .lean();
  if (customerData) {
    const errorResponse = utils.errorResponseBuilder(
      request,
      customerData,
      {
        status: 400,
        message: 'Customer already exists',
      }
    );
    return errorResponse;
  } else {
    const objectId = ObjectId.isValid(
      request.body.createdBy
    )
      ? ObjectId(request.body.createdBy)
      : new ObjectId();
    console.log(objectId);

    let newCustomerInfo = new custModel(request.body);
    let result = await newCustomerInfo.save();
    const successResponse = utils.successResposeBuilder(
      request,
      result,
      200,
      'Customer saved successfully'
    );
    return successResponse;
  }
}

async function getAllCustomers(request) {
  try {
    const customerData = await custModel
      .find()
      .populate('createdBy')
      .populate('approvers.approverId')
      .lean();
    const successResponse = utils.successResposeBuilder(
      request,
      customerData,
      200,
      'Customers retrieved successfully'
    );
    return successResponse;
  } catch (error) {
    throw error;
  }
}

async function updateCustomer(request) {
  try {
    const filter = {
      _id: request.params.customerId,
    };

    const updatedCustomerInfo =
      await custModel.findOneAndUpdate(
        filter,
        request.body,
        {
          new: true,
        }
      );
    const successResponse = utils.successResposeBuilder(
      request,
      updatedCustomerInfo,
      200,
      'Customer info updated successfully'
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
  saveNewCustomer: saveNewCustomer,
  getAllCustomers: getAllCustomers,
  updateCustomer: updateCustomer,
};
