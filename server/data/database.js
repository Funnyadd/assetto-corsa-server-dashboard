const Sequelize = require("sequelize")

// Load the configuration for the db from the env
const db = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT,
    dialect: 'postgres',
    define: { timestamps: false }
})
db.Sequelize = Sequelize

// Add any tables to the local database here
db.roles = require('./models/roles.model')(db, Sequelize.DataTypes)
db.servers = require('./models/servers.model')(db, Sequelize.DataTypes)
db.users = require('./models/users.model')(db, Sequelize.DataTypes)

// Configure relationships
// Not sure of this implementation, if ever there's an issue, here is the doc:
// https://sequelize.org/docs/v6/core-concepts/assocs/
db.users.hasOne(db.roles, {
    foreignKey: { name: 'role_id' }
})
db.roles.belongsTo(db.users, {
    as: 'role'
})

module.exports = db