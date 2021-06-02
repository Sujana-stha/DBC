// const multer = require('multer')
// const { DataTypes } = require('sequelize/types')
// const { sequelize } = require('.')

module.exports = (sequelize, DataTypes) => {
    const ProfilePicture = sequelize.define('profilePicture', {
        filePath: DataTypes.STRING
    });
    return ProfilePicture;
}