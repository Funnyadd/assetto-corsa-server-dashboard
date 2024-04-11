const serverService = require('../services/server.service');

exports.findAll = async (req, res) => {
    return res.json({ message: "GET server / endpoint" })
}

exports.find = async (req, res) => {
    const port = req.params.id
    console.log(`Request received for port ${port}`)

    const jsonResponse = await serverService.getServerJsonData(port)

    if (jsonResponse.status == 404) {
        return res.status(404).send({ error: jsonResponse.error})
    }
    return res.send(jsonResponse)
}

exports.add = async (req, res) => {
    return res.json({ message: "POST server /add endpoint" })
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