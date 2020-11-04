const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newSchema = new Schema(
  {
    title: String,
    description: String,
    imgPath: String,
  },
  {
    timestamps: true
  }
);

const New = mongoose.model('New', newSchema);


module.exports = New;