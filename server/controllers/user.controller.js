const userService = require('../services/user.service');

// Potnetially handle more errors like defined here
// https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
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
        console.log(response)
        return res.send({
            message: "User created successfully.",
            ...response
        })
    })
    .catch(error => {
        res.status(500).send({
            error: error,
            message: "An error occured when trying to create the user."
        })
    })
   
    // return res.json({ message: "POST user /add endpoint" })
}

exports.findAll = async (req, res) => {
    return res.json({ message: "GET user / endpoint" })
}

exports.find = async (req, res) => {
    const port = req.params.id
    return res.json({ message: "GET user / endpoint" })
}

exports.modifyUser = async (req, res) => {
    return res.json({ message: "PUT user /modify/:id endpoint" })
}

exports.deleteUser = async (req, res) => {
    return res.json({ message: "DELETE user /delete/:email endpoint" })
}