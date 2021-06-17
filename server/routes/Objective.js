const express = require("express");
const router = express.Router();
const { Objective } = require("../models");
const {validateToken} = require('../middlewares/authMiddleware')

// get all feedbacks
router.get("/", validateToken, async (req, res) => {
    const listOfObjective = await Objective.findAll();
    res.json(listOfObjective);
    
});

// get single feedbacks by id
router.get("/:id", validateToken, async (req, res) => {
  const id = req.params.id
  const objective = await Objective.findByPk(id);
  if(!objective) {   
    return res.status(400).send({
        message: `No Objective found with the id ${id}`,
    });
  } 
  res.json(objective);
});

// post new feedback
router.post("/", validateToken, async(req, res) => {
    const {title} = req.body
    const userId = req.user.id
    await Objective.create({
        
        title: title,
        userId: userId
    })
    res.json(req.body);
});

// delete feedbacks
router.delete("/:id",validateToken, (req, res) => {
    const id = req.params.id
    Objective.destroy({
        where: {
            id: id
        }
    }).then(()=> {
        res.json({success: "Objective deleted successfully!"})
    })
  
});

// edit a feedbacks
router.put("/:id", validateToken,async (req, res) => {
    const {title} = req.body
    const id = req.params.id
    const objective = await Objective.findOne({
        where: {
            id:id,
        },
    });
    if (!objective) {
        return res.status(400).send({
            message: `No Objective found with the id ${id}`,
        })
    }
    try {
        
        if(title) {
            objective.title = title
        }
        
        objective.save();
        return res.send({
            message: `Objective ${id} has been updated!`,
        });
    } catch(err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
});

module.exports = router;