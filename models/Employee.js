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
    phone: Number,
    comments: [],
    imgPath: { type: String, default: '/images/perfil2.jpeg' },
    department: [{ type: Schema.Types.ObjectId, ref: 'Department' }],
    rate: [{
      teamManagement: Number,
      communication: Number,
      puntuality: Number,
      project: Number,
      performance: Number,
    }],
  },
  {
    timestamps: true
  }
);

const Employee = mongoose.model('Employee', employeeSchema);


module.exports = Employee;