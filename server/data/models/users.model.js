module.exports = (db, DataTypes) => {
    const User = db.define("users", {
        firebaseUID: {
            field: 'firebase_uid',
            type: DataTypes.TEXT
        },
        email: {
            field: 'email',
            type: DataTypes.TEXT
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
    { underscore: true })

    return User
}