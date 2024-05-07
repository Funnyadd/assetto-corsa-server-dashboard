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
    
    const user = await this.getUserById(id)
    const idToken = await getUserIdToken(user.email, user.password)

    const data = {
        idToken: idToken
    }

    await fetch(firebase.deleteUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(async response => {
        let body = await response.json()

        if (!response.ok) {
            throw {
                status: body.error.code,
                code: body.error.message,
                message: firebase.errors[body.error.message]
            }
        }

        return usersDao.deleteUser(id)
    })
    .catch(error => {
        throw error
    })   
}

const getUserIdToken = async (email, password) => {
    const data = {
        email: email,
        password: password,
        returnSecureToken: true
    }

    return await fetch(firebase.signInWithEmailPasswordUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(async response => {
        let body = await response.json()

        if (!response.ok) {
            throw {
                status: body.error.code,
                code: body.error.message,
                message: firebase.errors[body.error.message]
            }
        }
        return body.idToken;
    })
    .catch(error => {
        throw error
    })
}
