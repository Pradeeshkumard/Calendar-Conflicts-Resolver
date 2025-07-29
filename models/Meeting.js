const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  participants: [{ type: String, required: true }],
});

module.exports = mongoose.model("Meeting", meetingSchema);
