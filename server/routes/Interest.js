const express = require("express");
const router = express.Router();
const { Interest } = require("../models");
const {validateToken} = require('../middlewares/authMiddleware')

// get all feedbacks
router.get("/", validateToken, async (req, res) => {
    const listOfInterest = await Interest.findAll();
    res.json(listOfInterest);
    
});

// get single feedbacks by id
router.get("/:id", validateToken, async (req, res) => {
  const id = req.params.id
  const interest = await Interest.findByPk(id);
  if(!interest) {   
    return res.status(400).send({
        message: `No Interest found with the id ${id}`,
    });
  } 
  res.json(interest);
});

// post new feedback
router.post("/", validateToken, async(req, res) => {
    const {title} = req.body
    const userId = req.user.id
    await Interest.create({
        
        title: title,
        userId: userId
    })
    res.json(req.body);
});

// delete feedbacks
router.delete("/:id",validateToken, (req, res) => {
    const id = req.params.id
    Interest.destroy({
        where: {
            id: id
        }
    }).then(()=> {
        res.json({success: "Interest deleted successfully!"})
    })
  
});

// edit a feedbacks
router.put("/:id", validateToken,async (req, res) => {
    const {title} = req.body
    const id = req.params.id
    const interest = await Interest.findOne({
        where: {
            id:id,
        },
    });
    if (!interest) {
        return res.status(400).send({
            message: `No interest found with the id ${id}`,
        })
    }
    try {
        
        if(title) {
            interest.title = title
        }
        
        interest.save();
        return res.send({
            message: `Interest ${id} has been updated!`,
        });
    } catch(err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
});

module.exports = router;