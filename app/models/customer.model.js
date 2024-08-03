const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890', 10);

const model = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    membershipType: { type: String, default: 'silver' },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    createdOn: { type: Date, default: Date.now },
    approvers: [
      {
        approverId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
        },
        isApproved: { type: Boolean, default: false },
      },
    ],
    status: { type: String },
  },
  { autoCreate: true }
);

module.exports = mongoose.model('customers', model);
