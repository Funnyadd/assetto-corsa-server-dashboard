const serversDao = require('../data/daos/servers.dao');

exports.getServerById = async (id) => {
    return await serversDao.getServerById(id)
    // getting occupied slots might need to be implemented or maybe it's not usefull info here
}

exports.getAllServers = async () => {
    let servers = await serversDao.getAllServers()

    let serversWithOccupiedSlots = await servers.map((server) => {
        return new Promise((resolve) => {
            if (server.isStarted) {
                getServerJsonData(server.currentPort)
                .then(serverData => {
                    server.occupiedSlots = getServerOccupiedSlots(serverData)
                    resolve(server)
                })
            }
            else {
                server.occupiedSlots = 0
                resolve(server)
            }
        })
    })
    
    return Promise.all(serversWithOccupiedSlots)
    .then(async serverList => serverList)
}

exports.updateServerInfo = async (server) => {
    return await serversDao.updateServer(server)
}

exports.startServer = async (id) => {
    let server = await serversDao.getServerById(id)

    // execute start script for server

    // if server is started
    server.isStarted = true

    return await serversDao.updateServer(server)
}

exports.stopServer = async (id) => {
    let server = await serversDao.getServerById(id)

    // execute stop script for server

    // if server is stopped
    server.isStarted = false

    return await serversDao.updateServer(server)
}

exports.stopAllServers = async () => {
    // execute killall servers script
}

exports.deleteServer = async (id) => {
    return await serversDao.deleteServer(id)
}


const getServerJsonData = async (port) => {
    const url = `${process.env.ASSETTO_SERVER_INFO_ENDPOINT}:${port}/JSON%7C`;

    return await fetch(url)
    .then(res => res.json())
    .catch(err => {
        // TODO:  Maybe redo this error handling if `err` contains important information for the user
        console.error(err)
        throw { status: 404, error: `No server running on port ${port}` }
    })
}

const getServerOccupiedSlots = (data) => {
    let cars = []
    if (data && data.Cars) cars = data.Cars

    let occupiedSlots = 0
    cars.forEach(car => {
        if (car.IsConnected) occupiedSlots++
    })

    return occupiedSlots
}