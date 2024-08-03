const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model = new Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    jobTitle: { type: String, required: true },
    jobDescription: { type: String, required: true },
    responsibilities: { type: String },
    hiringManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vendors',
    },
    jobType: { type: String, required: true },
    experience: {
      type: {
        min: Number,
        max: Number,
      },
      required: true,
    },
    jobLocation: {
      type: {
        city: String,
        state: String,
        country: String,
      },
      required: true,
    },
    workPlaceType: { type: String, required: true },
    compensation: {
      type: {
        currencyType: String,
        min: Number,
        max: Number,
      },
      required: true,
    },

    skills: { type: [String] },
    department: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { autoCreate: true }
);

module.exports = mongoose.model('job', model);
