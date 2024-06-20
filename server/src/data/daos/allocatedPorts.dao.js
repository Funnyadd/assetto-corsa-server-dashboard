const database = require("../database");
const AllocatedPortModel = database.allocatedPorts;

exports.getAllAllocatedPorts = async (allocatedPortModel = AllocatedPortModel) => {
    return new Promise((resolve, reject) => {
        allocatedPortModel.findAll()
        .then(async data => {
            if (data) {
                let returnData = []
                for (let a = 0; a < data.length; a++) {
                    returnData.push({
                        port: data[a].dataValues.port,
                        isUsed: data[a].dataValues.isUsed
                    })
                }
                resolve(returnData)
            }
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

exports.updateAllocatedPort = async (allocatedPort, allocatedPortModel = AllocatedPortModel) => {
    return new Promise((resolve, reject) => {
        allocatedPortModel.update(allocatedPort,
        {
            where: { port: allocatedPort.port },
            individualHooks: true
        })
        .then(async data => {
            if (data) {
                resolve({
                    port: data[1][0].dataValues.port,
                    isUsed: data[1][0].dataValues.isUsed
                })
            }
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

exports.createAllocatedPort = async (allocatedPort, allocatedPortModel = AllocatedPortModel) => {
    return new Promise((resolve, reject) => {
        allocatedPortModel.create(allocatedPort)
        .then(async data => {
            if (data) {
                resolve({
                    port: data.dataValues.port,
                    usUsed: data.dataValues.isUsed
                })
            }
            resolve(false)
        }).catch(err => {
            reject({
                status: 500,
                message: err.message || "some error occured"
            })
        })
    })
}

exports.deleteAllocatedPort = async (port, allocatedPortModel = AllocatedPortModel) => {
    return new Promise((resolve, reject) => {
        allocatedPortModel.destroy({ where: { port: port } })
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