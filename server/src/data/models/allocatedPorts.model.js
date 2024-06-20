module.exports = (db, DataTypes) => {
    const AllocatedPorts = db.define("allocated_ports", {
        port: {
            field: 'port',
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isUsed: {
            field: 'is_used',
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    },
    { underscore: true })

    return AllocatedPorts
}