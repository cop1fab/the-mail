export  default (sequelize, DataType) => {
    const User = sequelize.define('user', {
       firstName : {
           type: DataType.STRING,
           unique: true,
       },
       lastName : {
        type: DataType.STRING,
        unique: true,
        },
        email : {
            type: DataType.STRING,
            unique: true,
        },
        password : DataType.STRING,
        isAdmin: {
            type: DataType.boolean,
            default: false,
        },
    });
    User.associate = (models) =>{
        /* Normally, I should define foreign 
        keys here but user is a primary key 
        so I don't need association. */
    };
    return User;
};
