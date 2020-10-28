const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    img: { type: String, default: '...' },
    department: [{ type: Schema.Types.ObjectId, ref: 'Department' }]
  },
  {
    timestamps: true
  }
);

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;