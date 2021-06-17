module.exports = (sequelize, DataTypes) => {
    const UserInterest = sequelize.define("UserInterest", {
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'Users',
              key: 'id'
            }
        },
        interestId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'Interest',
              key: 'id'
            }
        }
    })

    return UserInterest;
};

