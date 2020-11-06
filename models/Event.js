const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    titleEvent: String,
    descriptionEvent: String,
    date: Date,
    time: String,
    place: String,
  },
  {
    timestamps: true
  }
);

const Event = mongoose.model('Event', eventSchema);


module.exports = Event;