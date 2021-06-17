const express = require("express");
const router = express.Router();
const { Feedbacks } = require("../models");
const {validateToken} = require('../middlewares/authMiddleware')

// get all feedbacks
router.get("/", validateToken, async (req, res) => {
    const listOfFeedbacks = await Feedbacks.findAll();
    res.json(listOfFeedbacks);
    
});

// get single feedbacks by id
router.get("/:id", validateToken, async (req, res) => {
  const id = req.params.id
  const feedback = await Feedbacks.findByPk(id);
  if(!feedback) {   
    return res.status(400).send({
        message: `No feedback found with the id ${id}`,
    });
  } 
  res.json(feedback);
});

// post new feedback
router.post("/", validateToken, async(req, res) => {
    const {rating, comments} = req.body
    const userId = req.user.id
    await Feedbacks.create({
        rating: rating,
        comments: comments,
        userId: userId
    })
    res.json(req.body);
});

// delete feedbacks
router.delete("/:id",validateToken, (req, res) => {
    const id = req.params.id
    Feedbacks.destroy({
        where: {
            id: id
        }
    }).then(()=> {
        res.json({success: "Feedback deleted successfully!"})
    })
  
});

// edit a feedbacks
router.put("/:id", validateToken,async (req, res) => {
    const {rating, comments} = req.body
    const id = req.params.id
    const feedback = await Feedbacks.findOne({
        where: {
            id:id,
        },
    });
    if (!feedback) {
        return res.status(400).send({
            message: `No feedback found with the id ${id}`,
        })
    }
    try {
        
        if(rating) {
            feedback.rating = rating
        }
        if(comments) {
            feedback.comments = comments
        }
        feedback.save();
        return res.send({
            message: `Feedback ${id} has been updated!`,
        });
    } catch(err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
});

module.exports = router;