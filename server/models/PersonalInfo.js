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
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: "id"
            }
        }
    });

    // PersonalInfo.associate = (models) => {
    //     PersonalInfo.belongsTo(models.Users, {
    //       onDelete: "cascade",
    //     })
    //   }
    return PersonalInfo;
};
