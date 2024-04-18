module.exports = (db, DataTypes) => {
    const Server = db.define("servers", {
        id:{
            field: 'id',
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            field: 'name',
            type: DataTypes.TEXT
        },
        currentPort: {
            field: 'current_port',
            type: DataTypes.INTEGER
        },
        isStarted: {
            field: 'is_started',
            type: DataTypes.BOOLEAN
        },
        totalSlots: {
            field: 'total_slots',
            type: DataTypes.INTEGER
        },
        hasTraffic: {
            field: 'has_traffic',
            type: DataTypes.BOOLEAN
        },
        hasCspServer: {
            field: 'has_csp_server',
            type: DataTypes.BOOLEAN
        }
    },
    { underscore: true })

    return Server
}