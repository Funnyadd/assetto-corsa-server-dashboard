const serverService = require('../services/server.service');
const { hasPermission } = require('../utils/utils');

exports.findAll = async (req, res) => {
    hasPermission(res, 3)
    await serverService.getAllServers()
    .then(response => {
        return res.send(response)
    })
    .catch(error => {
        return res.status(500).send({
            error: error,
            message: "An error occured when trying to get all servers."
        })
    })
}

exports.find = async (req, res) => {
    hasPermission(res, 3)

    const id = req.params.id

    const jsonResponse = await serverService.getServerById(id)

    if (jsonResponse.status == 404) {
        return res.status(404).send({ error: jsonResponse.error})
    }
    return res.send(jsonResponse)
}

exports.add = async (req, res) => {
    hasPermission(res, 2)

    return res.json({ endpoint: "POST server /add", message: "Not implemented yet" })
}

exports.edit = async (req, res) => {
    hasPermission(res, 2)

    return res.json({ message: "PUT server /edit", message: "Not implemented yet" })
}

exports.start = async (req, res) => {
    hasPermission(res, 2)

    if (!req.params.id) {
        return res.status(400).send({
            message: "Id cannot be empty."
        })
    }

    await serverService.startServer(req.params.id)
    .then(response => {
        return res.send(response)
    })
    .catch(error => {
        return res.status(error.status || 500).send({
            error: error,
            message: "An error occured when trying to start the server."
        })
    })
}

exports.stop = async (req, res) => {
    hasPermission(res, 2)

    if (!req.params.id) {
        return res.status(400).send({
            message: "Id cannot be empty."
        })
    }

    await serverService.stopServer(req.params.id)
    .then(response => {
        return res.send(response)
    })
    .catch(error => {
        return res.status(error.status || 500).send({
            error: error,
            message: "An error occured when trying to stop the server."
        })
    })
}

exports.stopAll = async (req, res) => {
    hasPermission(res, 2)

    await serverService.stopAllServers()
    .then(response => {
        return res.send(response)
    })
    .catch(error => {
        return res.status(error.status || 500).send({
            error: error,
            message: "An error occured when trying to stop the server."
        })
    })
}