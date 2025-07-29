const conflictService = require("../services/conflictService");
const suggestionService = require("../services/suggestionService");

const checkConflicts = async (req, res, next) => {
  try {
    // Extracting request body fields
    const { title, startTime, endTime, participants } = req.body;

    if (
      !title ||
      !startTime ||
      !endTime ||
      !participants ||
      !participants.length
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Checking for existing conflicts
    const hasConflict = await conflictService.checkForConflicts(
      startTime,
      endTime,
      participants
    );

    if (hasConflict) {
      return res.status(200).json({ message: "Conflict found" });
    }

    // if no conflicts found, scheduling the meeting
    const savedMeeting = await conflictService.saveMeeting({
      title,
      startTime,
      endTime,
      participants,
    });
    res.status(201).json({
      message: "Meeting scheduled successfully",
      meeting: savedMeeting,
    });
  } catch (err) {
    next(err);
  }
};

const suggestTimes = async (req, res, next) => {
  try {
    // Extracting request body fields
    const { startTime, endTime, participants } = req.body;

    //generating suggestion from suggesTimeSlots function
    const suggestions = await suggestionService.suggestTimeSlots(
      startTime,
      endTime,
      participants
    );

    if (!suggestions || !suggestions.length) {
      return res
        .status(200)
        .json({ message: "No available time slots found." });
    }

    //returning the suggested slot to user
    res.status(200).json({
      message: `${suggestions.length} slot(s) available`,
      suggestedSlots: suggestions,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { checkConflicts, suggestTimes };
