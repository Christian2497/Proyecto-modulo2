const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const managerSchema = new Schema(
  {
    name: String,
    lastName: String,
    email: String,
    password: String,
    img: { type: String, default: '...' },
    departmentId: String
  },
  {
    timestamps: true
  }
);

const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;