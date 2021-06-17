module.exports = (sequelize, DataTypes) => {
    const Interest = sequelize.define("Interest", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    });

    Interest.associate = (models) => {
        Interest.belongsToMany(models.Users, {
            through: "UserInterest",
            as: "Users",
            foreignKey: "interestId",
        })
    }
    return Interest;
};
