const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
    const {first_name, last_name, username, email, password} = req.body;
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
});

router.post("/login", async(req, res) => {
    const {email, password} = req.body;

    const user = await Users.findOne( {where: {email: email}} );

    if( !user ) res.json({error:" User doesnot exists"});
    bcrypt.compare(password, user.password).then((match)=> {
        if(!match) res.json({error: "Wrong username and password"})
        
        const accesstoken = sign({username: user.username, id: user.id}, 
            "importantsecret"
        );
        res.json({success: "you logged in", accesstoken})
    })

})

module.exports = router;
