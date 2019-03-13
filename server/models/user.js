    'use strict';
module.exports = (sequelize, DataType) => {
    const User = sequelize.define('Article', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    });
    User.associate = function(models){
        
    }
}