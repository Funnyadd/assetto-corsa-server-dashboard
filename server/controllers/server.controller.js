exports.findAll = async (req, res) => {
    return res.json({ message: "GET server / endpoint" })
}

exports.find = async (req, res) => {
    const port = req.params.id
    console.log(`Request received for port ${port}`)

    const jsonResponse = await getJson(port)
    return res.send(jsonResponse)
}

const getJson = async(port) => {
    const url = `http://localhost:${port}/JSON%7C`;

    return await fetch(url)
    .then(res => res.json())
    .catch(err => {
        console.error(err)
        return { status: 404, error: "No server running at this address" }
    })
}

exports.add = async (req, res) => {
    return res.json({ message: "POST server .add endpoint" })
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