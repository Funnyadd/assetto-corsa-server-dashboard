require("../../config.js")
const express = require('express')
const bodyParser = require("body-parser");
const serverRoutes = require('./routes/server.routes')
const userRoutes = require('./routes/user.routes')

module.exports = () => {
  const app = express()

  // Parses the request body to json automatically
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // Fixes the cors issues
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL)
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, POST, GET, PATCH')
    res.header('Access-Control-Allow-Headers', 'x-requested-with, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, refreshtoken');
    res.header('Access-Control-Expose-Headers', 'Authorization')
    next()
  })

  // Routes
  app.use('/server', serverRoutes)
  app.use('/user', userRoutes)

  // Handles requests on base url
  app.use('/', async (req, res) => 
    res.json({ message: "Hello from the Assetto Corssa Server Dashboard API!" })
  )

  return app
}