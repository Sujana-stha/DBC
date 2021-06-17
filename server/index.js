const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

//Routers
const usersRouter = require("./routes/Users")
app.use("/users", usersRouter)

const profileRouter = require("./routes/Profile")
app.use("/profile", profileRouter)

const matchRouter = require("./routes/Match")
app.use("/match", matchRouter)

const feedbackRouter = require("./routes/Feedbacks")
app.use("/feedbacks", feedbackRouter)

const imageRouter = require("./routes/ProfilePicture")
app.use("/upload", imageRouter)

const interestRouter = require("./routes/Interest")
app.use("/interest", interestRouter)

const objectiveRouter = require("./routes/Objective")
app.use("/objective", objectiveRouter)

const meetRouter = require("./routes/MeetUsers")
app.use("/meet", meetRouter)

const meetingRouter = require("./routes/Meetings")
app.use("/meetings", meetingRouter)

db.sequelize.sync().then(() => {
  app.listen(3003, () => {
    console.log("Server running on port 3003");
  });
});