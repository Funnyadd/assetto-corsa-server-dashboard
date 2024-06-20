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
    if (hasPermission(res, 2)) {
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
}

exports.find = async (req, res) => {
    if (hasPermission(res, 3)) {
        if (!req.params.id) {
            return res.status(400).send({
                message: "Id cannot be empty."
            })
        }
    
        try {
            let response
    
            if (req.query.uid)
                response = await userService.getUserByUID(req.params.id)
            else
                response = await userService.getUserById(req.params.id)
    
            return res.send(response)
        } catch (error) {
            return res.status(error.status || 500).send({
                error: error,
                message: "An error occured when trying to get the user."
            })
        }
    }
}

exports.modifyUser = async (req, res) => {
    if (hasPermission(res, 2)) {
        const user = {
            id: req.body.id,
            firebaseUID: req.body.firebaseUID,
            email: req.body.email,
            steamId: req.body.steamId,
            roleId: req.body.roleId,
            isWhitelisted: req.body.isWhitelisted
        }

        if (!req.body 
            || !user.id
            || !user.firebaseUID
            || !user.email
            || !user.steamId
            || !user.roleId
            || user.isWhitelisted === undefined
            || user.isWhitelisted === null
        ) {
            return res.status(400).send({
                message: "Content cannot be empty."
            })
        }

        userService.getUserById(user.id)
        .then(async originalUser => {
            if (originalUser.firebaseUID != user.firebaseUID) {
                return res.status(400).send({
                    message: "Cannot modify user's firebaseUID"
                })
            }
            
            if (originalUser.email !== user.email
                || originalUser.steamId !== user.steamId
                || user.roleId === 1
            ) {
                hasPermission(res, 1)
            }

            await userService.updateUser(user)
            .then(response => {
                return res.send(response)
            }) 
            .catch(error => {
                throw error
            })
        })
        .catch(error => {
            return res.status(error.status || 500).send({
                error: error,
                message: "An error occured when trying to modify the user."
            })
        })
    }
}

exports.deleteUser = async (req, res) => {
    if (hasPermission(res, 1)) {
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
}