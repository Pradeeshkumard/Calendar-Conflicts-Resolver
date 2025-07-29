const Meeting = require("../models/Meeting");
const moment = require("moment-timezone");

const checkForConflicts = async (startTime, endTime, participants) => {
  //converting to ist
  const istStart = moment.tz(startTime, "Asia/Kolkata").toDate();
  const istEnd = moment.tz(endTime, "Asia/Kolkata").toDate();

  const conflict = await Meeting.find({
    //matching overlapping participants
    participants: { $in: participants },
    //checking time overlaps
    $or: [
      {
        startTime: { $lt: istEnd },
        endTime: { $gt: istStart },
      },
    ],
  });
  //if no conflicts found it will return true
  return conflict.length > 0;
};

const saveMeeting = async (data) => {
  //creating new meeting in database
  const meeting = new Meeting({ ...data });
  return await meeting.save();
};

module.exports = { checkForConflicts, saveMeeting };
