const firebase = require("../utils/firebaseConfig")
const { getUserByUID } = require("./user.service")

exports.authenticate = async (req, res, next) => {
    // return next()
    if (req.headers.refreshtoken) {
        const data = {
            grant_type: "refresh_token",
            refresh_token: req.headers.refreshtoken
        }

        await fetch(firebase.exchangeRefreshTokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(async response => {
            let body = await response.json()

            // Needs more things like a way to signout the user if token expired from the interface
            // *******

            if (!response.ok) {
                throw {
                    status: body.error.status,
                    code: body.error.message,
                    message: firebase.errors[body.error.message]
                }
            }
            await getUserRoleAndContinue(res, next, body.user_id)
        })
        .catch(error => {
            if (typeof error.status == "string") {
                error.status = 400
            }
            res.status(error.status).send(error)
        })
    }
    else if (req.headers.authorization) {
        const encodedAuth = req.headers.authorization.split(" ")[1]
        const decodedAuth = atob(encodedAuth)
    
        const data = {
            email: decodedAuth.split(":")[0],
            password: decodedAuth.split(":")[1],
            returnSecureToken: true
        }
    
        await fetch(firebase.signInWithEmailPasswordUrl, {
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
                    status: 401,
                    code: body.error.message,
                    message: firebase.errors[body.error.message]
                }
            }
            await getUserRoleAndContinue(res, next, body.localId)
        })
        .catch(error => {
            res.status(error.status).send(error)
        })
    }
    else {
        res.status(401).send("Unauthorized")
    }
}

const getUserRoleAndContinue = async (res, next, uid) => {
    const user = await getUserByUID(uid)
    res.locals.roleId = user.roleId
    next()
}
