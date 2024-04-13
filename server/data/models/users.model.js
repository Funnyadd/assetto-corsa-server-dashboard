module.exports = (db, DataTypes) => {
    const User = db.define("users", {
        id:{
            field: 'id',
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        firebaseUUID: {
            field: 'firebase_uuid',
            type: DataTypes.UUID
        },
        steamUsername: {
            field: 'steam_username',
            type: DataTypes.TEXT
        },
        roleId: {
            field: 'role_id',
            type: DataTypes.INTEGER
        },
        isWhitelisted: {
            field: 'is_whitelisted',
            type: DataTypes.BOOLEAN
        }
    },
    { underscore: true });

    // User.removeAttribute('id'); // Does this need to be there?
    return User;
};