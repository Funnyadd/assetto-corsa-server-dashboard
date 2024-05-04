const serverService = require('../services/server.service');

exports.findAll = async (req, res) => {
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
    const id = req.params.id

    const jsonResponse = await serverService.getServerById(id)

    if (jsonResponse.status == 404) {
        return res.status(404).send({ error: jsonResponse.error})
    }
    return res.send(jsonResponse)
}

exports.add = async (req, res) => {
    return res.json({ message: "POST server /add endpoint" })
}

exports.edit = async (req, res) => {
    return res.json({ message: "PUT server /edit endpoint" })
}

exports.start = async (req, res) => {
    return res.json({ message: "POST server /start endpoint" })
}

exports.stop = async (req, res) => {
    return res.json({ message: "POST server /stop endpoint" })
}

exports.stopAll = async (req, res) => {
    return res.json({ message: "POST server /stopAll endpoint" })
}