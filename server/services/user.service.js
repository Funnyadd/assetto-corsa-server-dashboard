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
    const data = {
        email: user.email,
        password: user.password,
        returnSecureToken: true
    }

    return await fetch(firebase.signupUrl, {
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
        
        user.firebaseUID = body.localId
        return usersDao.createUser(user)
    })
    .catch(error => {
        throw error
    })
}

exports.updateUser = async (user) => {
    await usersDao.updateUser(user)

    const data = {
        email: user.email,
        idToken: "",
        returnSecureToken: true
    }
    
    await fetch(firebase.changeEmailUrl, {
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
        
        return usersDao.updateUser(user)
    })
    .catch(error => {
        throw error
    })
}

exports.deleteUser = async (id) => {
    return usersDao.deleteUser(id)
}