const firebase = require("../utils/firebaseConfig")
const { getUserByUID } = require("./user.service")

exports.authenticate = async (req, res, next) => {
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
            const body = await getBodyAndHandleError(response, res)
            await getUserRoleAndContinue(res, next, body.user_id)
        })
        .catch(error => {
            return res.status(401).send("Unauthorized")
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
            const body = await getBodyAndHandleError(response, res)
            await getUserRoleAndContinue(res, next, body.localId)
        })
        .catch(error => {
            return res.status(401).send("Unauthorized")
        })
    }
    else {
        return res.status(401).send("Unauthorized")
    }
}

const getUserRoleAndContinue = async (res, next, uid) => {
    const user = await getUserByUID(uid)
    res.locals.roleId = user.role.id
    next()
}

const getBodyAndHandleError = async (response, res) => {
    let body = await response.json()

    if (!response.ok) {
        console.error({
            status: body.error.status,
            code: body.error.message,
            message: firebase.errors[body.error.message]
        })
        throw body.error
    }

    return body
}
