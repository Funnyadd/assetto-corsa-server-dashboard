const serversDao = require('../data/daos/servers.dao');

exports.getServerById = async (id) => {
    return await serversDao.getServerById(id)
}

exports.getAllServers = async () => {
    const servers = await serversDao.getAllServers()
    await servers.forEach(server => {
        if (server.isStarted) {
            getServerJsonData(server.currentPort)
            .then(serverData => {
                server.occupiedSlots = getServerOccupiedSlots(serverData)
            })
        }
        else {
            server.occupiedSlots = 0
        }
    })
    return servers
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
    const url = `${process.env.ASSETTO_SERVER_ENDPOINT}:${port}/JSON%7C`;

    return await fetch(url)
    .then(res => res.json())
    .catch(err => {
        console.error(err)
        return { status: 404, error: `No server running on port ${port}` }
    })
}

const getServerOccupiedSlots = async (data) => {
    let cars = []
    if (data !== undefined) cars = data.Cars

    let occupiedSlots = 0
    cars.forEach(car => {
        if (car.IsConnected) occupiedSlots++
    })

    return occupiedSlots
}