module.exports = (db, DataTypes) => {
    const Role = db.define("roles", {
        id:{
            field: 'id',
            type: DataTypes.INTEGER
        },
        name: {
            field: 'name',
            type: DataTypes.TEXT
        },
    },
    { underscore: true });

    // User.removeAttribute('id'); // Does this need to be there?
    return Role;
};