const firebase = require('../utils/firebaseConfig');
const usersDao = require('../data/daos/users.dao');
const steamService = require('./steam.service');

exports.getUserById = async (id) => {
    return await usersDao.getUserByUniqueIdentidier(id, false)
}

exports.getUserByUID = async (uid) => {
    return await usersDao.getUserByUniqueIdentidier(uid, true)
}

exports.getAllUsers = async () => {
    return await usersDao.getAllUsers()
}

exports.createUser = async (user) => {
    user.steamUsername = await steamService.getSteamUsername(user.steamId)

    return await firebase.adminAuth.createUser({
        email: user.email,
        password: user.password,
    })
    .then(userRecord => {
        user.firebaseUID = userRecord.uid
        return usersDao.createUser(user)
    })
    .catch(error => {
        throw error.errorInfo || error
    })
}

exports.updateUser = async (user) => {
    user.steamUsername = await steamService.getSteamUsername(user.steamId)

    return await firebase.adminAuth.updateUser(user.firebaseUID, {
        email: user.email
    })
    .then(() => {
        return usersDao.updateUser(user)
    })
    .catch(error => {
        throw error.errorInfo || error
    })
}

exports.deleteUser = async (uid) => {
    return await firebase.adminAuth.deleteUser(uid)
    .then(() => {
        return usersDao.deleteUser(uid)
    })
    .catch(error => {
        throw error.errorInfo || error
    }) 
}
