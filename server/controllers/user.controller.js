const userService = require('../services/user.service');

exports.create = async (req, res) => {
    if (!req.body 
        || !req.body.email
        || !req.body.password
        || !req.body.steamUsername
    ) {
        return res.status(400).send({
            message: "Content cannot be empty."
        })
    }

    const user = {
        email: req.body.email,
        password: req.body.password,
        steamUsername: req.body.steamUsername
    }

    await userService.createUser(user)
    .then(response => {
        return res.send({
            message: "User created successfully.",
            ...response
        })
    })
    .catch(error => {
        if (error.code) {
            return res.status(error.status).send({
                status: error.status,
                code: error.code,
                message: error.message
            })
        }
        return res.status(500).send({
            error: error,
            message: "An error occured when trying to create the user."
        })
    })
}

exports.findAll = async (req, res) => {
    await userService.getAllUsers()
    .then(response => {
        return res.send(response)
    })
    .catch(error => {
        return res.status(500).send({
            error: error,
            message: "An error occured when trying to get all users."
        })
    })
}

exports.find = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({
            message: "Id cannot be empty."
        })
    }

    await userService.getUserById(req.params.id)
    .then(async response => {
        return res.send(response)
    })
    .catch(error => {
        return res.status(500).send({
            error: error,
            message: "An error occured when trying to get all users."
        })
    })
}

// TODO: To be tested and finished (if email or password modification, call firebase)
exports.modifyUser = async (req, res) => {
    if (!req.body 
        || !req.body.id
        || !req.body.email
        || !req.body.steamUsername
        || !req.body.isWhitelisted
    ) {
        return res.status(400).send({
            message: "Content cannot be empty."
        })
    }

    const user = {
        id: req.body.id,
        email: req.body.email,
        steamUsername: req.body.steamUsername,
        isWhitelisted: req.body.isWhitelisted
    }

    await userService.updateUser(user)
    .then(response => {
        return res.send(response)
    }) 
    .catch(error => {
        return res.status(500).send({
            error: error,
            message: "An error occured when trying to modify the users."
        })
    })
}

// Finish errors like 404 (verify return messages from firebase and show them to user)
exports.deleteUser = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({
            message: "Id cannot be empty."
        })
    }

    await userService.deleteUser(req.params.id)
    .then(response => {
        if (response)
            return res.send({ message: "User delete successfully" })
        else
            return res.status(404).send({ message: "User not found" })
    })
    .catch(error => {
        return res.status(500).send({
            error: error,
            message: "An error occured when trying to delete the user."
        })
    })
}