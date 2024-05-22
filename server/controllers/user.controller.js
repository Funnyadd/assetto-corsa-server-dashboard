const userService = require('../services/user.service');
const { hasPermission } = require('../utils/utils');

exports.create = async (req, res) => {
    if (!req.body 
        || !req.body.email
        || !req.body.password
        || !req.body.steamId
    ) {
        return res.status(400).send({
            message: "Content cannot be empty."
        })
    }

    const user = {
        email: req.body.email,
        password: req.body.password,
        steamId: req.body.steamId
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
            return res.status(400).send({
                status: 400,
                code: error.code,
                message: error.message
            })
        }
        return res.status(error.status || 500).send({
            error: error,
            message: "An error occured when trying to create the user."
        })
    })
}

exports.findAll = async (req, res) => {
    hasPermission(res, 3)

    await userService.getAllUsers()
    .then(response => {
        return res.send(response)
    })
    .catch(error => {
        return res.status(error.status || 500).send({
            error: error,
            message: "An error occured when trying to get all users."
        })
    })
}

exports.find = async (req, res) => {
    hasPermission(res, 3)

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
        return res.status(error.status || 500).send({
            error: error,
            message: "An error occured when trying to get the user."
        })
    })
}

// TODO: To be tested and finished (if email or password modification, call firebase)
exports.modifyUser = async (req, res) => {
    hasPermission(res, 1)

    if (!req.body 
        || !req.body.id
        || !req.body.firebaseUID
        || !req.body.email
        || !req.body.steamId
        || !req.body.role
        || !req.body.isWhitelisted
    ) {
        return res.status(400).send({
            message: "Content cannot be empty."
        })
    }

    const user = {
        id: req.body.id,
        firebaseUID: req.body.firebaseUID,
        email: req.body.email,
        steamId: req.body.steamId,
        role: req.body.role,
        isWhitelisted: req.body.isWhitelisted
    }

    await userService.updateUser(user)
    .then(response => {
        return res.send(response)
    }) 
    .catch(error => {
        return res.status(error.status || 500).send({
            error: error,
            message: "An error occured when trying to modify the user."
        })
    })
}

// Finish errors like 404 (verify return messages from firebase and show them to user)
exports.deleteUser = async (req, res) => {
    hasPermission(res, 1)

    if (!req.params.uid) {
        return res.status(400).send({
            message: "firebaseUID cannot be empty."
        })
    }

    await userService.deleteUser(req.params.uid)
    .then(response => {
        if (response)
            return res.send({ message: "User deleted successfully" })
        else
            return res.status(404).send({ message: `User not found with uid ${req.params.uid}` })
    })
    .catch(error => {
        return res.status(error.status || 500).send({
            error: error,
            message: "An error occured when trying to delete the user."
        })
    })
}