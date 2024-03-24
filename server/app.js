require("../config.js")
const firebase = require('firebase/app')
const express = require('express')
const firebaseConfig = require('./firebaseConfig.js')
const filesRoutes = require('./routes/files.routes.js')
const serverRoutes = require('./routes/server.routes')
const userRoutes = require('./routes/user.routes')
const whitelistRoutes = require('./routes/whitelist.routes')

module.exports = () => {
  const app = express()

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Fixes the cors issues
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*")
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, POST, GET, OPTIONS, HEAD')
    res.header(
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Headers, x-requested-with, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization'
    );
    res.header('Access-Control-Expose-Headers', 'Authorization')
    next()
  })

  // Routes
  app.use('/files', filesRoutes)
  app.use('/server', serverRoutes)
  app.use('/user', userRoutes)
  app.use('/whitelist', whitelistRoutes)

  // Handles requests on base url
  app.use('/', async (req, res) => 
    res.json({ message: "Hello from the Assetto Corssa Server Dashboard!" })
  )

  // ****** To be added later on (This is just a template/idea) *******
  // Handles page refresh on the client side
  // (view index.hmtl and 404.html located in the client/public folder)
  // app.use((req, res) =>
    // res.sendFile(path.resolve(__dirname, '../client/public/404.html'))
  // )

  return app
}