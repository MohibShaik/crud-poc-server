const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    skills: { type: [String] },
    experience: { type: Number, required: true },
    visaStatus: { type: String },
    designation: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    empCode: { type: String, required: true },
    datesLog: [
      {
        startDate: { type: Date, default: Date.now },
        endDateDate: { type: Date },
      },
    ],
    availabilityStatus: {
      type: String,
      required: true,
      enum: ['available', 'unavailable'],
    },
  },
  { autoCreate: true }
);

module.exports = mongoose.model('employees', model);
