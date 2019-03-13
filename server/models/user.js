export  default (sequelize, DataType) => {
    const Users = sequelize.define('users', {
       firstName : DataType.STRING,
       lastName : DataType.STRING,
        email : {
            type: DataType.STRING,
            unique: true,
        },
        password : DataType.STRING,
        isAdmin: {
            type: DataType.BOOLEAN,
            default: false,
        },
    });
    Users.associate = (models) =>{
        /* Normally, I should define foreign 
        keys here but user is a primary key 
        so I don't need association. */
    };
    return Users;
};
