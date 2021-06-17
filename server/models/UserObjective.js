module.exports = (sequelize, DataTypes) => {
  const UserObjective = sequelize.define("UserObjective", {
      UserId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          }
      },
      objectiveId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Objective',
            key: 'id'
          }
      }
  })

  return UserObjective;
};

