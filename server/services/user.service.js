const firebase = require('../firebaseConfig');
const usersDao = require('../data/daos/users.dao');

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
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const firebaseUser = response.json()
        user,firebaseUUID = firebaseUser.localId
        return usersDao.createUser(user)
    })
    .catch(error => {
        console.error('Error:', error)
    })
}