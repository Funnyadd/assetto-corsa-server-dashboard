const database = require("../database");
const UserModel = database.users;

exports.getUserById = async (id, userModel = UserModel) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({
            where: { id: id }
        })
        .then(async data => {
            if (data) resolve(data.dataValues)
            resolve(false)
        })
        .catch(err => {
            reject({
                status: 500,
                message: err.message || "some error occured"
            })
        })
    })
}

exports.getAllUsers = async (userModel = UserModel) => {
    return new Promise((resolve, reject) => {
        userModel.findAll()
        .then(async data => {
            if (data) {
                let returnData = []
                for (let u = 0; u < data.length; u++) {
                    returnData.push({
                        id: data[u].dataValues.id,
                        firebaseUID: data[u].dataValues.firebaseUID,
                        email: data[u].dataValues.email,
                        steamUsername: data[u].dataValues.steamUsername,
                        roleId: data[u].dataValues.roleId,
                        isWhitelisted: data[u].dataValues.isWhitelisted
                    })
                }
                resolve(returnData)
            }
            resolve(false)
        })
        .catch(err => {
            reject({
                status: 500,
                data: {},
                message: err.message || "some error occured"
            })
        })
    })
}

exports.createUser = async (user, userModel = UserModel) => {
    return new Promise((resolve, reject) => {
        userModel.create(user)
        .then(async data => {
            if (data) {
                resolve({
                    firebaseUID: data.dataValues.firebaseUID,
                    steamUsername: data.dataValues.steamUsername,
                    email: data.dataValues.email,
                })
            }
            resolve(false)
        }).catch(err => {
            reject({
                status: 500,
                data: {},
                message: err.message || "some error occured"
            })
        })
    })
}

exports.updateUser = async (user, userModel = UserModel) => {
    return new Promise((resolve, reject) => {
        userModel.update(user,
        {
            where: { id: user.id },
            individualHooks: true
        })
        .then(async data => {
            resolve(data ? true : false)
        })
        .catch(err => {
            reject({
                status: 500,
                data: {},
                message: err.message || "some error occured"
            })
        })
    })
}

exports.deleteUser = async (id, userModel = UserModel) => {
    return new Promise((resolve, reject) => {
        userModel.destroy({ where: { id: id } })
        .then(async data => {
            resolve(data ? true : false)
        })
        .catch(err => {
            reject({
                status: 500,
                message: err.message || "some error occured"
            })
        })
    })
}