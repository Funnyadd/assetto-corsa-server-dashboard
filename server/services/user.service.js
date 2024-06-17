const firebase = require('../utils/firebaseConfig');
const usersDao = require('../data/daos/users.dao');
const rolesDao = require('../data/daos/roles.dao');
const steamService = require('./steam.service');
const serverService = require('./server.service');

exports.getUserById = async (id) => {
    return await usersDao.getUserByUniqueIdentidier(id, false)
}

exports.getUserByUID = async (uid) => {
    return await usersDao.getUserByUniqueIdentidier(uid, true)
}

exports.getAllUsers = async () => {
    let users = await usersDao.getAllUsers()
    users.sort((a, b) => a.id - b.id)
    return users
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
    .then(async () => {
        let modifiedUser = await usersDao.updateUser(user)
        modifiedUser.role = await rolesDao.getRoleById(modifiedUser.roleId)
        delete modifiedUser.roleId

        await serverService.syncWhitelist()

        return modifiedUser
    })
    .catch(error => {
        throw error.errorInfo || error
    })
}

exports.deleteUser = async (uid) => {
    return await firebase.adminAuth.deleteUser(uid)
    .then(async () => {
        let deletedUser = await usersDao.deleteUser(uid)
        await serverService.syncWhitelist()
        return deletedUser
    })
    .catch(error => {
        throw error.errorInfo || error
    }) 
}
