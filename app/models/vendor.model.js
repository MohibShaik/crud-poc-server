const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890', 10);

const model = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    companyName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { autoCreate: true }
);

module.exports = mongoose.model('vendors', model);
