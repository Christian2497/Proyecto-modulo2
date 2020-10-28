const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const managerSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    img: { type: String, default: '...' },
    departmentId: [{ type: Schema.Types.ObjectId, ref: 'Department' }]
  },
  {
    timestamps: true
  }
);

const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;