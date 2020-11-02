const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    name: String,
    lastName: String,
    email: String,
    password: String,
    starterDate: Date,
    position: String,
    age: Number,
    comments: [],
    img: { type: String, default: '/images/perfil2.jpeg' },
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