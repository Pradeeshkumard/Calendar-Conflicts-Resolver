const express = require("express");
const dotenv = require("dotenv");
const meetingRoutes = require("./routes/meetingRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDatabase = require("./config/database");
dotenv.config();

const PORT = process.env.PORT || 8000;

//connecting database
connectDatabase();

const app = express();

//middleware to ready request body and parse to json format
app.use(express.json());

//routing middleware
app.use("/api/meetings", meetingRoutes);

//global error handling middleware
app.use(errorHandler);

//listening app in specific port
app.listen(PORT, () => {
  console.log(`Server is started listening in the port ${PORT}`);
});
