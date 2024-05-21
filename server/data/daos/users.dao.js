const database = require("../database");
const UserModel = database.users;

exports.getUserByUniqueIdentidier = async (id, isUID, userModel = UserModel) => {
    let whereObject = { id: id }
    if (isUID) {
        whereObject = { firebaseUID: id }
    }

    return new Promise((resolve, reject) => {
        userModel.findOne({
            where: whereObject
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
                        steamId: data[u].dataValues.steamId,
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
                    firebaseUID: data.dataValues.firebaseUID,
                    steamUsername: data.dataValues.steamUsername,
                    steamId: data.dataValues.steamId,
                    email: data.dataValues.email,
                    roleId: data.dataValues.roleId,
                    isWhitelisted: data.dataValues.isWhitelisted,
                })
            }
            resolve(false)
        }).catch(err => {
            reject({
                status: 500,
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
            if (data[1][0]) {
                resolve({
                    id: data[1][0].dataValues.id,
                    firebaseUID: data[1][0].dataValues.firebaseUID,
                    steamUsername: data[1][0].dataValues.steamUsername,
                    steamId: data[1][0].dataValues.steamId,
                    roleId: data[1][0].dataValues.roleId,
                    email: data[1][0].dataValues.email,
                    isWhitelisted: data[1][0].dataValues.isWhitelisted,
                })
            }
            reject({
                status: 404,
                message: "User not found"
            })
        })
        .catch(err => {
            reject({
                status: 500,
                message: err.message || "some error occured"
            })
        })
    })
}

exports.deleteUser = async (uid, userModel = UserModel) => {
    return new Promise((resolve, reject) => {
        userModel.destroy({ where: { firebaseUID: uid } })
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