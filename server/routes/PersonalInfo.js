const express = require("express");
const router = express.Router();
const { PersonalInfo, BusinessInfo, Interest } = require("../models");
const jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
    const { profile, summary, business_sector, business_name, position, interest } = req.body;
    const authHeader = req.headers.authorization;
    const decoded = jwt.verify(authHeader, "importantsecret");
    var userId = decoded.id
    // res.json(userId);

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
    Interest.create({
        interest:interest,
        userId: userId
    })
    res.json("SUCCESS");
    // res.json(req.body);
});

module.exports = router;
