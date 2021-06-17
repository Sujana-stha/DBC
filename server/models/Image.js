// module.exports = (sequelize, DataTypes) => {
//   const Image = sequelize.define("Image", {
//     type: {
//       type: DataTypes.STRING,
//     },
//     name: {
//       type: DataTypes.STRING,
//     },
//     data: {
//       type: DataTypes.BLOB("long"),
//     },
    
//   });
//   Image.associate = (models) => {
//     Image.belongsTo(models.Users, {
//         as: "Users",
//         onDelete: "cascade",
//     })
//   }
//   return Image;
// };

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define("Image", {
      type: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data: {
        type: DataTypes.STRING,
        allowNull: false,
      }
      
  });

  Image.associate = (models) => {
    Image.belongsTo(models.Users, {
          as: "Users",
          foreignKey: "userId",
      })
  }
  return Image;
};
