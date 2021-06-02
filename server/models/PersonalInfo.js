module.exports = (sequelize, DataTypes) => {
    const PersonalInfo = sequelize.define("PersonalInfo", {
        profile: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        summary: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    });

    PersonalInfo.associate = (models) => {
        PersonalInfo.belongsTo(models.Users, {
          onDelete: "cascade",
        })
      }
    return PersonalInfo;
};
