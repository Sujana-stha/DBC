const express = require("express");
const router = express.Router();
const { Image, PersonalInfo, BusinessInfo, Users, UserInterest, UserObjective } = require("../models");
const { validateToken } = require('../middlewares/authMiddleware')
const { Op, where } = require("sequelize");


function filter(finalId){
    const matchUsers = []
    finalId.forEach(id =>{
      if(!matchUsers.includes(id)){
        matchUsers.push(id)
      }
    })
    return matchUsers
}

// returns each user and respective interest id <UserId, InterestId>
router.get("/", validateToken, async (req, res) => {
    const userId = req.user.id

    // get interest list of authenticated users
    const authInterests = await UserInterest.findAll({
      where: {
        UserId: userId,
      },
    });
    //array of authenticated users interests id
    const IntId = authInterests.map((interest) => {
      return interest.interestId;
    });
  
    //collection of users having same interests id
    const matchInterest = await UserInterest.findAll({
      where: {
        interestId: IntId,
        [Op.not]: {UserId: userId}
      },
    });
    
    //array of matched users id
    const matchIntId = matchInterest.map((user) => {
        return user.UserId;
    }); 
    
    // objectives list of authenticated users 
    const authObjectives = await UserObjective.findAll({
        where: {
          UserId: userId,
        },
    });

    // array of objective id of authenticated users
    const ObjId = authObjectives.map((objective) => {
        return objective.objectiveId;
    });
    
    //matched objective Id from users lists
    const matchObj = await UserObjective.findAll({
        where: {
          objectiveId: ObjId,
          [Op.not]: {UserId: userId}
        },
    });
      
    const matchObjId = matchObj.map((obj) => {
        return obj.UserId;
    }); 
      
    const finalMatchId = [...matchIntId, ...matchObjId]
    const result = filter(finalMatchId)
    const matchUserList = await Users.findAll({
        where: {
          id: result
        //   [Op.not]: {UserId: userId}
        },
        include: [{all: true}]
    });
    res.json(matchUserList);
});
// GET ALL LIST OF PROFILES
// router.get("/", validateToken, async(req, res) => {
//     const userId = req.user.id

    // const authUserInterst = await UserInterest.findAll({
    //     where: { UserId: userId }
    // })
    // const IntId = authUserInterst.map((interest) => {
    //     return interest.interestId;
    // });
    
    // const users = UserInterest.findAll({
    //     where: {
    //       interestId: IntId,
    //       [Op.not]: {UserId: userId}
    //     },
    // });
    
    // res.json(users);
    
    // console.log(users);

    // listOfProfile.map((lists) => {

    // })

// })

module.exports = router;