const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    role: { type: String },
    isActive: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { autoCreate: true }
);

module.exports = mongoose.model('users', model);
