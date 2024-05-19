const serversDao = require('../data/daos/servers.dao');
const allocatedPortsService = require('./allocatedPorts.service');
const { 
    getActiveScreenList,
    startServerScript,
    stopServerScript,
    getShortServerName,
    updateServerPortScript
} = require('../utils/scripts');

exports.getServerById = async (id) => {
    return await serversDao.getServerById(id)
    // getting occupied slots might need to be implemented or maybe it's not usefull info here
}

exports.getAllServers = async () => {
    let servers = await serversDao.getAllServers()

    let activeServers = await getActiveScreenList()

    // Sync up the servers
    servers.forEach(async server => {
        if (activeServers.includes(getShortServerName(server.name)) && !server.isStarted) {
            server.isStarted = true
            await serversDao.updateServer(server)
        }
        else if (!activeServers.includes(getShortServerName(server.name)) && server.isStarted) {
            server.isStarted = false
            await serversDao.updateServer(server)
        }
    })

    // Add occupied slots
    let serversWithOccupiedSlots = await servers.map((server) => {
        return new Promise((resolve) => {
            if (server.isStarted) {
                getServerJsonData(server.lastPort)
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
    .then(async serverList => serverList.sort((a, b) => a.id - b.id))
}

exports.updateServerInfo = async (server) => {
    return await serversDao.updateServer(server)
}

exports.startServer = async (id) => {
    let server = await serversDao.getServerById(id)

    if (server) {
        allocatePortToServer(server)

        startServerScript(server)

        return await serversDao.updateServer(server)
    }
    else {
        throw { status: 404, message: "Server not found" }
    }
}

exports.stopServer = async (id) => {
    let server = await serversDao.getServerById(id)

    if (server) {
        unallocateForServer(server)

        stopServerScript(server)

        return await serversDao.updateServer(server)
    }
    else {
        throw { status: 404, message: "Server not found" }  
    }
}

exports.stopAllServers = async () => {
    let serverList = await serversDao.getAllServers()

    try {
        await serverList.map((server) => {
            if (server.isStarted) {
                this.stopServer(server.id)
            }
        })
    }
    catch (error) {
        throw error
    }
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

const allocatePortToServer = async (server) => {
    let unusedPortsList = await allocatedPortsService.getUnusedAllocatedPortsList()

    if (unusedPortsList.filter(allocatedPort => allocatedPort.port === server.lastPort)[0]) {
        let allocatedPort = { port: server.lastPort, isUsed: true }
        await allocatedPortsService.updateAllocatedPort(allocatedPort)
        return
    } 
    else if (unusedPortsList[0]) {
        unusedPortsList[0].isUsed = true
        await allocatedPortsService.updateAllocatedPort(unusedPortsList[0])
        server.lastPort = unusedPortsList[0].port
        updateServerPortScript(server)
        return
    }

    throw { status: 400, message: "All ports are used" }
}

const unallocateForServer = async (server) => {
    const allocatedPort = { port: server.lastPort, isUsed: false }
    await allocatedPortsService.updateAllocatedPort(allocatedPort)
}