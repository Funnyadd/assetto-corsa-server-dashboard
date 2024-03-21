exports.create = async (req, res) => {
    return res.json({ message: "POST user /add endpoint" })
}

exports.findAll = async (req, res) => {
    return res.json({ message: "GET user / endpoint" })
}

exports.login = async (req, res) => {
    return res.json({ message: "POST user /login endpoint" })
}

exports.logout = async (req, res) => {
    return res.json({ message: "POST user /logout endpoint" })
}

exports.modifyUser = async (req, res) => {
    return res.json({ message: "PUT user /modify/:id endpoint" })
}

exports.deleteUser = async (req, res) => {
    return res.json({ message: "DELETE user /delete/:email endpoint" })
}