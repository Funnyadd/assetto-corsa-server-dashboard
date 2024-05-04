const database = require("../database");
const ServerModel = database.servers;

// Untested
exports.getServerById = async (id, serverModel = ServerModel) => {
    return new Promise((resolve, reject) => {
        serverModel.findOne({
            where: { id: id }
        })
        .then(async data => {
            if (data) resolve(data)
            resolve(false)
        })
        .catch(err => {
            reject({
                status: 500,
                message: err.message || "some error occured"
            })
        })
    })
}

exports.getAllServers = async (serverModel = ServerModel) => {
    return new Promise((resolve, reject) => {
        serverModel.findAll()
        .then(async data => {
            if (data) {
                let returnData = []
                for (let s = 0; s < data.length; s++) {
                    returnData.push({
                        id: data[s].dataValues.id,
                        name: data[s].dataValues.name,
                        currentPort: data[s].dataValues.currentPort,
                        isStarted: data[s].dataValues.isStarted,
                        totalSlots: data[s].dataValues.totalSlots,
                        hasTraffic: data[s].dataValues.hasTraffic,
                        hasCspServer: data[s].dataValues.hasCspServer
                    })
                }
                resolve(returnData)
            }
            resolve(false)
        })
        .catch(err => {
            reject({
                status: 500,
                data: {},
                message: err.message || "some error occured"
            })
        })
    })
}

// Untested
exports.createServer = async (server, serverModel = ServerModel) => {
    return new Promise((resolve, reject) => {
        serverModel.create(server)
        .then(async data => {
            if (data) {
                resolve({
                    id: data.dataValues.id,
                    firebaseUUID: data.dataValues.firebaseUUID,
                    steamUsername: data.dataValues.steamUsername,
                    role: data.dataValues.role,
                    isWhitelisted: data.dataValues.isWhitelisted
                })
            }
            resolve(false)
        }).catch(err => {
            reject({
                status: 500,
                data: {},
                message: err.message || "some error occured"
            })
        })
    })
}

// Untested
exports.updateServer = async (server, serverModel = ServerModel) => {
    return new Promise((resolve, reject) => {
        serverModel.update(server,
        {
            where: { id: server.id },
            individualHooks: true
        })
        .then(async data => {
            resolve(data ? true : false)
        })
        .catch(err => {
            reject({
                status: 500,
                data: {},
                message: err.message || "some error occured"
            })
        })
    })
}

// Untested
exports.deleteServer = async (id, serverModel = ServerModel) => {
    return new Promise((resolve, reject) => {
        serverModel.destroy({ where: { id: id } })
        .then(async data => {
            resolve(data ? true : false)
        })
        .catch(err => {
            reject({
                status: 500,
                message: err.message || "some error occured"
            })
        })
    })
}