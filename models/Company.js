const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    img: { type: String, default: '/images/perfil2.jpeg' },
  },
  {
    timestamps: true
  }
);

const Company = mongoose.model('Company', companySchema);

module.exports = Company;