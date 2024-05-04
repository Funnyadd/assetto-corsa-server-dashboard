// Probably not going to use this nor the routes

exports.add = async (req, res) => {
    return res.json({ message: "POST whitelist / endpoint" })
}

exports.findAll = async (req, res) => {
    return res.json({ message: "GET whitelist / endpoint" })
}

exports.delete = async (req, res) => {
    return res.json({ message: "DELETE whitelist /delete/:username endpoint" })
}