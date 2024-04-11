const database = require("../database");
const UserModel = database.users;

exports.getUserById = async (id, userModel = UserModel) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({
            where: { id: id }
        })
        .then(async data => {
            if (data) resolve(data)
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
                        firebaseUUID: data[u].dataValues.firebaseUUID,
                        steamUsername: data[u].dataValues.steamUsername,
                        role: data[u].dataValues.role,
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
                    id: data.dataValues.id,
                    firebaseUUID: data.dataValues.firebaseUUID,
                    steamUsername: data.dataValues.steamUsername,
                    role: data.dataValues.role,
                    isWhitelisted: data.dataValues.isWhitelisted
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