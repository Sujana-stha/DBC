const express = require("express");
const router = express.Router();
const { MeetUser, Users } = require("../models");
const {validateToken} = require('../middlewares/authMiddleware')


router.get("/", validateToken, async (req, res) => {
    const id = req.user.id
    
    const meetUserLists = await MeetUser.findAll({
        where: {
            MeetUserId : id
        },
    });
    res.json(meetUserLists)
    
});

router.get("/all", validateToken, async (req, res) => {
    
    const allMatchedLists = await MeetUser.findAll();
    res.json(allMatchedLists)
    
});

router.get("/matchedUser", validateToken, async(req, res)=> {
    const id = req.user.id
    
    const usersInfo = await Users.findAll({
        
        include: {
            model: MeetUser,
            where: {
                status: "accepted",
                
            }
        }
    })
   
    console.log(meetUsers)
    res.json(usersInfo);
})

// post new meet
router.post("/", validateToken, async(req, res) => {
    const {MeetUserId, MeetUsername, status} = req.body
    const userId = req.user.id
    const username = req.user.username

    await MeetUser.create({
        MeetUserId: MeetUserId,
        status: status,
        MeetUsername: MeetUsername,
        authUsername: username,
        UsersId: userId
    })
    res.json({message: "Added successfully"});
});

// edit a meet users
router.put("/:id", validateToken,async (req, res) => {
    const {status} = req.body
    const id = req.params.id
    const meetStatus = await MeetUser.findOne({
        where: {
            id:id,
        },
    });
    if (!meetStatus) {
        return res.status(400).send({
            message: `Not found with the id ${id}`,
        })
    }
    try {
        
        if(status) {
            meetStatus.status = status
        }
        
        meetStatus.save();
        return res.send({
            message: `Meet Status of ${id} has been updated!`,
        });
    } catch(err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
});

// delete meet users
router.delete("/:id",validateToken, (req, res) => {
    const id = req.params.id
    const username =  req.user.username
    try {
        if(username === "admin_user") {
            MeetUser.destroy({
                where: {
                    id: id
                }
            }).then(()=> {
                res.json({success: "Meet User deleted successfully!"})
            })
        } else {
            res.json({error: "Only admin can delete this meeting"})
        }

    } catch (error) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
    
  
});
module.exports = router;