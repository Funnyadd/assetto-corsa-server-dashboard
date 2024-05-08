const firebase = require('../firebaseConfig');
const usersDao = require('../data/daos/users.dao');
const rolesDao = require('../data/daos/roles.dao');

exports.getUserById = async (id) => {
    const user = await usersDao.getUserById(id)
    return await rolesDao.getRoleById(user.roleId)
    .then(role => {
        user.role = role.name
        delete user.roleId
        return user
    })
}

exports.getAllUsers = async () => {
    const data = await usersDao.getAllUsers()
    return await rolesDao.getAllRoles()
    .then(async roles => {
        data.forEach(user => {
            user.role = roles.find(r => r.id === user.roleId).name
            delete user.roleId
        })
        return data
    })
}

exports.createUser = async (user) => {
    return await firebase.adminAuth.createUser({
        email: user.email,
        password: user.password,
    })
    .then(userRecord => {
        user.firebaseUID = userRecord.uid
        return usersDao.createUser(user)
    })
    .catch(error => {
        throw error.errorInfo
    })
}

exports.updateUser = async (user) => {
    return await firebase.adminAuth.updateUser(user.firebaseUID, {
        email: user.email
    })
    .then(() => {
        return usersDao.updateUser(user)
    })
    .catch(error => {
        throw error.errorInfo
    })
}

exports.deleteUser = async (uid) => {
    return await firebase.adminAuth.deleteUser(uid)
    .then(() => {
        return usersDao.deleteUser(uid)
    })
    .catch(error => {
        throw error.errorInfo
    }) 
}
