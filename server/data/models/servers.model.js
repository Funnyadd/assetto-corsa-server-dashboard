module.exports = (db, DataTypes) => {
    const Server = db.define("servers", {
        id: {
            field: 'id',
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            field: 'name',
            type: DataTypes.TEXT,
            allowNull: false
        },
        lastPort: {
            field: 'last_port',
            type: DataTypes.INTEGER
        },
        isStarted: {
            field: 'is_started',
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        totalSlots: {
            field: 'total_slots',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hasTraffic: {
            field: 'has_traffic',
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    { underscore: true })

    return Server
}