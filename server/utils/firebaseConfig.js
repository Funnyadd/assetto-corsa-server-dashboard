require("../../config.js");
const admin = require("firebase-admin");
const { getAuth } = require('firebase-admin/auth');
const serviceAccount = require("../assetto-corsa-server-dashboard-firebase-adminsdk.json");

const baseUrl = "https://identitytoolkit.googleapis.com/v1/accounts:"

const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

module.exports = {
    adminAuth: getAuth(firebaseAdmin),
    /**
     * https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
     */
    signInWithEmailPasswordUrl: `${baseUrl}signInWithPassword?key=${process.env.API_KEY}`,
    /**
     * https://firebase.google.com/docs/reference/rest/auth#section-refresh-token
     */
    exchangeRefreshTokenUrl: `https://securetoken.googleapis.com/v1/token?key=${process.env.API_KEY}`,

    /**
     * Possible error messages received from firebase admin authentication
     */
    errors: {
        EMAIL_EXISTS: "The email address is already in use by another account.",
        OPERATION_NOT_ALLOWED: "Operation is disabled for this project.",
        TOO_MANY_ATTEMPTS_TRY_LATER: "We have blocked all requests from this device due to unusual activity. Try again later.",
        EMAIL_NOT_FOUND: "There is no user record corresponding to this identifier. The user may have been deleted.",
        INVALID_PASSWORD: "The password is invalid or the user does not have a password.",
        USER_DISABLED: "The user account has been disabled by an administrator.",
        TOKEN_EXPIRED: "The user's credential is no longer valid. The user must sign in again.",
        USER_DISABLED: "The user account has been disabled by an administrator.",
        USER_NOT_FOUND: "The user corresponding to the refresh token was not found. It is likely the user was deleted.",
        INVALID_REFRESH_TOKEN: "An invalid refresh token is provided.",
        INVALID_EMAIL: "The email address is badly formatted.",
        INVALID_GRANT_TYPE: "The grant type specified is invalid.",
        MISSING_REFRESH_TOKEN: "No refresh token provided.",
        PROJECT_NUMBER_MISMATCH: "The project number of the refresh token does not match that of the API key provided.",
    }
}
