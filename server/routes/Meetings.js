const express = require("express");
const router = express.Router();
const { Meetings } = require("../models");
const {validateToken} = require('../middlewares/authMiddleware')

// get all meetings
router.get("/", validateToken, async (req, res) => {
    const listOfMeetings = await Meetings.findAll();
    res.json(listOfMeetings);
    
});

// get single meetings by id
router.get("/:id", validateToken, async (req, res) => {
  const id = req.params.id
  const meeting = await Meetings.findByPk(id);
  if(!meeting) {   
    return res.status(400).send({
        message: `No Meeting found with the id ${id}`,
    });
  } 
  res.json(meeting);
});

// post new feedback
router.post("/", validateToken, async(req, res) => {
    const {title, startDate, endDate, descriptions, partner} = req.body
    const userId = req.user.id
    await Meetings.create({
        title: title,
        startDate: startDate,
        endDate:endDate,
        descriptions: descriptions,
        partner: partner,
        UsersId: userId
    })
    res.json(req.body);
});

// delete meetings
router.delete("/:id",validateToken, (req, res) => {
    const id = req.params.id
    Meetings.destroy({
        where: {
            id: id
        }
    }).then(()=> {
        res.json({success: "Meeting deleted successfully!"})
    })
  
});

// edit a meetings
router.put("/:id", validateToken,async (req, res) => {
    const {title, startDate, endDate, descriptions, partner} = req.body
    const id = req.params.id
    const meeting = await Meetings.findOne({
        where: {
            id:id,
        },
    });
    if (!meeting) {
        return res.status(400).send({
            message: `No Meeting found with the id ${id}`,
        })
    }
    try {
        
        if(title) {
            meeting.title = title
        }
        if(startDate) {
            meeting.startDate = startDate
        }
        if(endDate) {
            meeting.endDate = endDate
        }
        if(descriptions) {
            meeting.descriptions = descriptions
        }
        if(partner) {
            meeting.partner = partner
        }
        meeting.save();
        return res.send({
            message: `Meeting ${id} has been updated!`,
        });
    } catch(err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
});

module.exports = router;