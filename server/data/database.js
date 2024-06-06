const Sequelize = require("sequelize")

// Load the configuration for the db from the env
const db = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 5433,
    dialect: 'postgres',
    define: {
        timestamps: false,
        underscored: true,
        logging: false
    }
})
db.Sequelize = Sequelize

// Add any tables to the local database here
db.allocatedPorts = require('./models/allocatedPorts.model')(db, Sequelize.DataTypes)
db.roles = require('./models/roles.model')(db, Sequelize.DataTypes)
db.servers = require('./models/servers.model')(db, Sequelize.DataTypes)
db.users = require('./models/users.model')(db, Sequelize.DataTypes)

// Configure relationships
db.roles.hasOne(db.users)
db.users.belongsTo(db.roles)

module.exports = db