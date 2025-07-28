const express = require("express");

const {
  checkConflicts,
  suggestTimes,
} = require("../controllers/meetingController");

const router = express.Router();

router.post("/check-conflicts", checkConflicts);

router.post("/suggest-times", suggestTimes);

module.exports = router;
