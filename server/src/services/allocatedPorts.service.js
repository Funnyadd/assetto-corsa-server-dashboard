const allocatedPortsDao = require("../data/daos/allocatedPorts.dao")

exports.getAllocatedPortsList = async () => {
    let ports = await allocatedPortsDao.getAllAllocatedPorts()
    ports.sort((a, b) => a.port - b.port)
    return ports
}

exports.getUnusedAllocatedPortsList = async () => {
    let ports = await this.getAllocatedPortsList()
    return ports.filter(allocatedPort => allocatedPort.isUsed === false)
}

exports.updateAllocatedPort = async (allocatedPort) => {
    return await allocatedPortsDao.updateAllocatedPort(allocatedPort)
}

exports.deletePortAllocation = async (port) => {
    return await allocatedPortsDao.deleteAllocatedPort(port)
}