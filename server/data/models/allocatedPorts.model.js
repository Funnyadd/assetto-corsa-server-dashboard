module.exports = (db, DataTypes) => {
    const AllocatedPorts = db.define("allocated_ports", {
        port: {
            field: 'port',
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        isUsed: {
            field: 'is_used',
            type: DataTypes.BOOLEAN
        },
    },
    { underscore: true })

    return AllocatedPorts
}