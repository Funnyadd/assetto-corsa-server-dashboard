exports.download = async (req, res) => {
    return res.json({ message: "GET files /download endpoint" })
}

exports.upload = async (req, res) => {
    return res.json({ message: "POST files /upload endpoint" })
}