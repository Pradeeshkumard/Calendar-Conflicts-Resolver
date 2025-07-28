const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const meetingRoutes = require("./routes/meetingRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDatabase = require("./config/database");
dotenv.config();

const PORT = process.env.PORT || 8000;

connectDatabase();

const app = express();

app.use(express.json());

app.use("api/meetings", meetingRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is started listening in the port ${PORT}`);
});
