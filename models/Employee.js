const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    name: String,
    lastName: String,
    email: String,
    password: String,
    img: { type: String, default: '...' },
    department: [{ type: Schema.Types.ObjectId, ref: 'Department' }],
    rate: [{
      teamUp: Number,
      communication: Number,
      puntuality: Number,
      project: Number,
    }],
  },
  {
    timestamps: true
  }
);

const Employee = mongoose.model('Employee', employeeSchema);


module.exports = Employee;