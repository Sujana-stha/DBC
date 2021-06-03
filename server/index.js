const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

//Routers
const usersRouter = require("./routes/Users")
app.use("/auth", usersRouter)

const personlRouter = require("./routes/PersonalInfo")
app.use("/profile", personlRouter)

// const profileRouter = require("./routes/ProfilePicture")
// app.use("/upload", profileRouter)


db.sequelize.sync().then(() => {
    app.listen(3003, () => {
      console.log("Server running on port 3003");
    });
  });