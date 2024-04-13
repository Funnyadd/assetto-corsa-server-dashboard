const serverService = require('../services/server.service');

exports.findAll = async (req, res) => {
    return res.json({ message: "GET server / endpoint" })
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