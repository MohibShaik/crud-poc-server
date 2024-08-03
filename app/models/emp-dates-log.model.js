const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model = new Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees',
    },
    dates: [
      {
        startDate: { type: Date },
        endDateDate: { type: Date },
      },
    ],
  },
  { autoCreate: true }
);

module.exports = mongoose.model('employees', model);
