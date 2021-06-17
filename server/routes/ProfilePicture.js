const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const upload = require("../middlewares/upload");


  router.get("/", homeController.getHome);

  router.post("/", upload.single("file"), uploadController.uploadFiles);

 


  module.exports = router;