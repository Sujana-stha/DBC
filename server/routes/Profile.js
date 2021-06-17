const express = require("express");
const router = express.Router();
const { Image, PersonalInfo, BusinessInfo, Users, UserInterest, UserObjective } = require("../models");
const {validateToken} = require('../middlewares/authMiddleware')
const upload = require("../middlewares/upload");
const fs = require("fs");
const path = require('path');
 var __basedir = path.resolve();

// GET ALL LIST OF PROFILES
router.get("/", async (req, res) => {
    const listOfProfile = await Users.findAll({
        include:[{all:true}]
    })
    console.log(listOfProfile);
    res.json(listOfProfile)
})

//POST PROFILE INFORMATIONS
router.post("/", validateToken, upload.single("file"), async(req, res) => {
    const { objective, countries, summary, business_sector, business_name, position, interest } = req.body;
    console.log(req.body)
    const userId = req.user.id
    try {
        // console.log(req.file);

        // if (req.file == undefined) {
        //     return res.send(`You must select a file.`);
        // }
        await PersonalInfo.create({
            summary: summary,
            countries: countries,
            UsersId: userId
        })
        // Image.create({
        //     type: req.file.mimetype,
        //     name: req.file.originalname,
        //     data: __basedir + "/resources/static/assets/uploads/" + req.file.filename
        // })
        // Image.create({
        //     type: req.file.mimetype,
        //     name: req.file.originalname,
        //     data: fs.readFileSync(
        //       __basedir + "/resources/static/assets/uploads/" + req.file.filename,
        //       {encoding:'base64'}
        //     ),
        //     userId: userId,
        //   }).then((image) => {
        //     fs.writeFileSync(
        //       __basedir + "/resources/static/assets/tmp/" + image.name,
        //       image.data,
        //       {encoding:'base64'}
        //     );
      
            // return res.send(`File has been uploaded.`);
        // });
        BusinessInfo.create({
            business_name: business_name,
            business_sector: business_sector,
            position: position,
            UsersId: userId
        });
        objective.forEach(obj => {
            UserObjective.create({
                objectiveId: obj,
                UserId: userId
            });
        });
        // UserInterest.create({
        //     interestId: interest,
        //     UserId: userId
        // })
        interest.forEach(intId => {
            UserInterest.create({
                interestId: intId,
                UserId: userId
            })
        })

        res.json("SUCCESS");
    } catch(error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
    }
    
});

//GET SINGLE PROFILE
router.get("/:id", validateToken, async (req, res) => {
    const id = req.params.id
    const profile = await Users.findByPk(id, {
        include:[{all:true}]
    });
    if(!profile) {   
      return res.status(400).send({
          message: `No feedback found with the id ${id}`,
      });
    } 
    res.json(profile);
});



// delete feedbacks
router.delete("/:id",validateToken, (req, res) => {
    const id = req.params.id
    Users.destroy({
        where: {
            id: id
        },
        include:[{all:true}]
    }).then(()=> {
        res.json({success: "Profile deleted successfully!"})
    })
  
});

module.exports = router;
