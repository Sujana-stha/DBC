module.exports = (sequelize, DataTypes) => {
    const BusinessInfo = sequelize.define("BusinessInfo", {
        business_sector: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        business_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
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


    return BusinessInfo;
};
