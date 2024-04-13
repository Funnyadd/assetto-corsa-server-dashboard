require("../config.js");

const baseUrl = "https://identitytoolkit.googleapis.com/v1/accounts:"

module.exports = {
    // apiKey: process.env.API_KEY, // Needed from env

    // Do those variables need to be included in the env file ????
    // authDomain: process.env.AUTH_DOMAIN,
    // projectId: process.env.PROJECT_ID,
    // storageBucket: process.env.STORAGE_BUCKET,
    // messagingSenderId: process.env.MESSAGING_SENDER_ID,
    // appId: process.env.APP_ID,
    // measurementId: process.env.MEASUREMENT_ID,

    /** 
     * https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
     */
    signupUrl: `${baseUrl}signUp?key=${process.env.API_KEY}`,
    /**
     * https://firebase.google.com/docs/reference/rest/auth#section-change-email
     */
    changeEmailUrl: `${baseUrl}update?key=${process.env.API_KEY}`,
    /**
     * https://firebase.google.com/docs/reference/rest/auth#section-delete-account
     */
    deleteUrl: `${baseUrl}delete?key=${process.env.API_KEY}`
    
}
