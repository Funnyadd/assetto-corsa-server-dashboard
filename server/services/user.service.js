const firebase = require('../firebaseConfig');
const usersDao = require('../data/daos/users.dao');

exports.getUserById = async (id) => {
    return await usersDao.getUserById(id)
}

exports.getAllUsers = async () => {
    return await usersDao.getAllUsers()
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
            throw body.error
        }
        
        user.firebaseUID = body.localId
        return usersDao.createUser(user)
    })
    .catch(error => {
        throw error
    })
}

exports.updateUser = async (user) => {
    return usersDao.updateUser(user)
}

exports.deleteUser = async (id) => {
    return usersDao.deleteUser(id)
}