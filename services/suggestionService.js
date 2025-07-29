const Meeting = require("../models/Meeting");
const moment = require("moment-timezone");

const BUFFER_MINUTES = 15; // Default buffer time in minutes
const MAX_SUGGESTIONS = 3; // Maximum number of slots to suggest
const WORK_START_HOUR = 9; // Workday start time
const WORK_END_HOUR = 17; // Workday end time

const suggestTimeSlots = async (startTime, endTime, participants) => {
  const suggestions = [];

  //slot checking in the same day
  let day = moment.tz(startTime, "Asia/Kolkata").startOf("day");

  while (suggestions.length < MAX_SUGGESTIONS) {
    const dayStart = day.clone().hour(WORK_START_HOUR).minute(0); // Day starts at 9 AM IST
    const dayEnd = day.clone().hour(WORK_END_HOUR).minute(0); // Day ends at  5 PM IST

    let current = dayStart.clone();
    while (
      current
        .clone()
        .add(moment(endTime).diff(moment(startTime)), "ms") // Ensuring slotEnd within working hours
        .isSameOrBefore(dayEnd)
    ) {
      //calculating slot timing
      const slotStart = current.clone();
      const slotEnd = slotStart
        .clone()
        .add(moment(endTime).diff(moment(startTime)), "ms");

      //including buffer timing
      const bufferBefore = slotStart
        .clone()
        .subtract(BUFFER_MINUTES, "minutes");
      const bufferAfter = slotEnd.clone().add(BUFFER_MINUTES, "minutes");

      const conflict = await Meeting.findOne({
        participants: { $in: participants },
        $or: [
          {
            startTime: { $lt: bufferAfter.toDate() },
            endTime: { $gt: bufferBefore.toDate() },
          },
        ],
      });

      if (!conflict) {
        suggestions.push({
          suggestedStart: slotStart.format(), // Formating to ISO string in IST
          suggestedEnd: slotEnd.format(), // Formating to ISO string in IST
        });
      }

      current = slotEnd.clone(); // Moving to next available time after this slot
    }

    day.add(1, "day");
  }

  return suggestions.slice(0, MAX_SUGGESTIONS); // return top n suggestions
};

module.exports = { suggestTimeSlots };
