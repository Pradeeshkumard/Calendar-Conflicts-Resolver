const isTimeOverlap = (startA, endA, startB, endB, bufferTime = 15) => {
  //adding buffer to give some rest before starting new meeting or after ending meeting
  const startTime1 = new Date(startA).getTime();
  const endTime1 = new Date(endA).getTime() + bufferTime * 60000; // converting to ms
  const startTime2 = new Date(startB).getTime() - bufferTime * 60000;
  const endTime2 = new Date(endB).getTime();

  //conflict checking
  return startTime1 < endTime2 && startTime2 < endTime1;
};

const isWithinWorkingHourse = (start, end) => {
  const startTime = new Date(start).getHours();
  const endTime = new Date(end).getHours();

  return startTime >= 9 && endTime <= 17;
};

const addExtraMinutes = (date, minutes) => {
  return new Date(date).getTime() + minutes * 60000;
};

module.exports = { isTimeOverlap, isWithinWorkingHourse, addExtraMinutes };
