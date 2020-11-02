const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const managerSchema = new Schema(
  {
    name: String,
    lastName: String,
    email: String,
    password: String,
    starterDate: Date,
    position: String,
    phone: Number,
    img: { type: String, default: '/images/perfil2.jpeg' },
  },
  {
    timestamps: true
  }
);

const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;