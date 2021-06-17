'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// db.images = require("./Image")(sequelize, Sequelize);

// db.Users = require("./Users")(sequelize, Sequelize);
// db.Users.hasOne(db.images, {
//   foreignKey: "userId"
// })
// db.Interest = require("./Interest")(sequelize, Sequelize);
// db.Objective = require("./Objective")(sequelize, Sequelize);

//USERS AND INTEREST RELATIONSHIP
// db.Users.belongsToMany(db.Interest, {
//   through: "UserInterest",
//   as: "Interest",
//   foreignKey: "userId",
// });
// db.Interest.belongsToMany(db.Users, {
//   through: "UserInterest",
//   as: "Users",
//   foreignKey: "interestId",
// });

// USERS AND OBJECTIVES RELATIONHSIP
// db.Users.belongsToMany(db.Objective, {
//   through: "UserObjective",
//   as: "Objective",
//   foreignKey: "userId",
// });
// db.Objective.belongsToMany(db.Users, {
//   through: "UserObjective",
//   as: "Users",
//   foreignKey: "objectiveId",
// });

module.exports = db;
