// Maybe put this in server for server upload and download
// Eventually add ftp or wtv endpoint to get missing cars or tracks

exports.download = async (req, res) => {
    return res.json({ endpoint: "GET files /download", message: "Not implemented yet" })
}

exports.upload = async (req, res) => {
    return res.json({ endpoint: "POST files /upload", message: "Not implemented yet" })
}