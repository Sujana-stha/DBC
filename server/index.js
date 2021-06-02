const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

//Routers
const usersRouter = require("./routes/Users")
app.use("/auth", usersRouter)

const profileRouter = require("./routes/ProfilePicture")
app.use("/upload", profileRouter)


db.sequelize.sync().then(() => {
    app.listen(3002, () => {
      console.log("Server running on port 3002");
    });
  });