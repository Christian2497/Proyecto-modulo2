const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema(
  {
    name: String,
    description: String,
    employee: [{ type: Schema.Types.ObjectId, ref: 'Employee' }],
  },
  {
    timestamps: true
  }
);

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;