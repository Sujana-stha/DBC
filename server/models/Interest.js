module.exports = (sequelize, DataTypes) => {
    const Interests = sequelize.define("Interests", {
        interest: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        

    });


    return Interests;
};
