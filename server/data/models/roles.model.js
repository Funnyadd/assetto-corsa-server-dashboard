module.exports = (db, DataTypes) => {
    const Role = db.define("roles", {
        id: {
            field: 'id',
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            field: 'name',
            type: DataTypes.TEXT
        },
    },
    { underscore: true })

    return Role
}