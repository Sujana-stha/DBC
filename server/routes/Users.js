const express = require("express");
const router = express.Router();
const { Users, PersonalInfo, BusinessInfo, Objective } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");


// GET ALL USERS
router.get("/", validateToken, async (req, res) => {
    const listOfUsers = await Users.findAll();
    res.json(listOfUsers);
    
});
// GET AUTHENTICATED USER
router.get("/authUser", validateToken, async(req, res) => {
    const userId = req.user.id
    const authUser = await Users.findOne({
        where: {
            id: userId
        }
    })
    res.json(authUser);
});

// GET SINGLE USER
router.get("/:id", validateToken, async (req, res) => {
    const id = req.params.id
    const user = await Users.findByPk(id);
    if(!user) {   
      return res.status(400).send({
          message: `No User found with the id ${id}`,
      });
    } 
    res.json(user);
  });

//CREATE NEW USER
router.post("/", async (req, res) => {
    const {first_name, last_name, username, email, password} = req.body;
    let userExists = await Users.findOne({
        where: {
            email
        }
    })
    if(userExists) {
        return res.status(400).send({
            message: 'An account with that email already exists!',
        });
    }
    try{
        bcrypt.hash(password, 5).then((hash)=> {
            Users.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                username: username,
                password: hash,
            })
        })
        res.json("SUCCESS");
    } catch(err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
    
});

// LOGIN
router.post("/login", async(req, res) => {
    const {email, password} = req.body;

    const user = await Users.findOne( {where: {email: email}} );

    if( !user ) res.json({error:" User doesnot exists"});
    bcrypt.compare(password, user.password).then((match)=> {
        if(!match) res.json({error: "Wrong username and password"})
        
        const accesstoken = sign({username: user.username, id: user.id}, 
            "importantsecret",
            {
                expiresIn: '2h'
            }
        );
        res.json({success: "you logged in", accesstoken, data: req.body})
    })

})


// EDIT A USER
router.put("/:id", async (req, res) => {
    const {first_name, last_name, username, email} = req.body;
    const id = req.params.id
    const user = await Users.findOne({
        where: {
            id:id,
        },
    });
    if (!user) {
        return res.status(400).send({
            message: `No user found with the id ${id}`,
        })
    }
    try {
        if(first_name) {
            user.first_name = first_name
        }
        if(last_name) {
            user.last_name = last_name
        }
        if(email) {
            user.email = email
        }
        if(username) {
            user.username = username
        }
        user.save();
        return res.send({
            message: `User ${id} has been updated!`,
        });
    } catch(err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
});

//DELETE USER
router.delete("/:id", async (req, res) => {
    const id = req.params.id
    
    if (!id) {
      return res.status(400).send({
        message: 'Please provide a id for the user you are trying to delete!',
      });
    }
  
    const user = await Users.findOne({
      where: {
        id: id
      },
    });
  
    if (!user) {
      return res.status(400).send({
        message: `No user found with the id ${id}`,
      });
    }
  
    try {
      await user.destroy();
      return res.send({
        message: `User ${id} has been deleted!`,
      });
    } catch (err) {
      return res.status(500).send({
        message: `Error: ${err.message}`,
      });
    }
  
});

//GET A SINGLE USER

module.exports = router;
