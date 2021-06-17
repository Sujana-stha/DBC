module.exports = (sequelize, DataTypes) => {
    const Feedbacks = sequelize.define("Feedbacks", {
        
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comments: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: "id"
            },
            
        }

    });

    
    return Feedbacks;
};
