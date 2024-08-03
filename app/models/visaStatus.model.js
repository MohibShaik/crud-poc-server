const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model = new Schema(
  {
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { autoCreate: true }
);

module.exports = mongoose.model('visaStatus', model);
