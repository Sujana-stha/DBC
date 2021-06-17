module.exports = (sequelize, DataTypes) => {
    const Objective = sequelize.define("Objective", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    });

    Objective.associate = (models) => {
        Objective.belongsToMany(models.Users, {
            through: "UserObjective",
            as: "Users",
            foreignKey: "objectiveId",
        })
    }
    return Objective;
};