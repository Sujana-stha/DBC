const multer = require('multer')
const express = require('express')
const router = express.Router();
const { ProfilePicture } = require("../models");
// const Sequelize = require('sequelize')
// const sequelize = new Sequelize('database', 'username', 'password')


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './app/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

router.post('/', multer({ storage }).single('example'), async (req, res) => {
   
    await sequelize.sync()

    const filePath = `${req.file.destination}/${req.file.filename}`

    const file = await ProfilePicture.create({ filePath })
    res.json("success",file)
});

module.exports = router;