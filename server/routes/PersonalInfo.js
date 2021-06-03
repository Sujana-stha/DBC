const express = require("express");
const router = express.Router();
const { PersonalInfo, BusinessInfo, Interests } = require("../models");
const jwt = require("jsonwebtoken");
const {validateToken} = require('../middlewares/authMiddleware')

router.post("/", validateToken,  (req, res) => {
    const { profile, summary, business_sector, business_name, position, interest } = req.body;
    // const authHeader = req.headers.authorization;
    // const decoded = jwt.verify(authHeader, "importantsecret");
    // var userId = decoded.id
    // res.json(userId);
    const userId = req.user.id

     PersonalInfo.create({
        profile: profile,
        summary: summary,
        userId: userId
    })

     BusinessInfo.create({
        business_name: business_name,
        business_sector: business_sector,
        position: position,
        userId: userId
    })
    Interests.create({
        interest:interest,
        userId: userId
    })
    res.json("SUCCESS");
    // res.json(req.body);
});

module.exports = router;
