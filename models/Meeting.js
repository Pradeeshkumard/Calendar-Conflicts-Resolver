const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  Title: String,
  start: Date,
  end: Date,
  participants: [String],
});

module.exports = mongoose.model("Meeting", meetingSchema);
