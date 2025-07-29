const express = require("express");
const router = express.Router();
const {
  checkConflicts,
  suggestTimes,
} = require("../controllers/meetingController");

router.post("/check-conflicts", checkConflicts);
router.post("/suggest-times", suggestTimes);

module.exports = router;
