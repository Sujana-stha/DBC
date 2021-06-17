module.exports = (sequelize, DataTypes) => {
    const Meetings = sequelize.define("Meetings", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        descriptions: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        partner: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    });

    Meetings.associate = (models) => {
        Meetings.belongsTo(models.Users, {
            as: "Users",
            onDelete: "cascade",
        })
    }
    return Meetings;
};
