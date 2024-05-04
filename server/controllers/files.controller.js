// Maybe put this in server for server upload and download
// Eventually add ftp or wtv endpoint to get missing cars or tracks

exports.download = async (req, res) => {
    return res.json({ message: "GET files /download endpoint" })
}

exports.upload = async (req, res) => {
    return res.json({ message: "POST files /upload endpoint" })
}