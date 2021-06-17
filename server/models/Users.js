

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    });
    
    Users.associate = (models) => {
        Users.belongsToMany(models.Objective, {
            through: "UserObjective",
            as: "Objective",
            foreignKey:  "UserId",
        })
        Users.belongsToMany(models.Interest, {
            through: "UserInterest",
            as: "Interest",
            foreignKey:  "UserId",
        })
        Users.hasOne(models.BusinessInfo, {
            foreignKey:  "UsersId",
        })
        Users.hasOne(models.PersonalInfo, {
            foreignKey:  "UsersId",
        })
        Users.hasOne(models.Image, {
            foreignKey:  "userId",
        })
        Users.hasMany(models.MeetUser, {
            foreignKey:  "UsersId",
        })
        Users.hasMany(models.Meetings, {
            foreignKey:  "UsersId",
        })
    }

    return Users;
};
