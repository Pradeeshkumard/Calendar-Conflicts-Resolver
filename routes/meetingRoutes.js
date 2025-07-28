const express = require("express");

const router = express.Router();

router.post("/check-conflicts", checkConflicts);

router.post("/suggest-times", suggestTimes);

module.exports = router;
