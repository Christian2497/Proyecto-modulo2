const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema(
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

const Company = mongoose.model('Company', companySchema);

module.exports = Company;