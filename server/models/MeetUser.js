module.exports = (sequelize, DataTypes) => {
    const MeetUser = sequelize.define("MeetUser", {
        
        MeetUserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        MeetUsername : {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('pending', 'accepted', 'declined'),
            allowNull: false
        },
        authUsername: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });

    MeetUser.associate = (models) => {
        MeetUser.belongsTo(models.Users, {
            as: "Users",
            onDelete: "cascade",
        })
    }
    return MeetUser;
};
