module.exports = (sequelize, DataTypes) => {
    const Interests = sequelize.define("Interests", {
        interest: {
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

    return Interests;
};
