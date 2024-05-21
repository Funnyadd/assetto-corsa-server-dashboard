require("../config.js")
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

  // TEMPORARY ADD to support old version while tests are made
  app.use('/', async (req, res) => {
    const port = req.query.port
    console.log(`Request received for port ${port}`)

    const url = `http://localhost:${port}/JSON%7C`;
  
    const jsonResponse = await fetch(url)
    .then(res => res.json())
    .catch(err => {
      console.error(err)
      return { status: 404, error: "No server running at this address" }
    })

    res.json(jsonResponse)
    console.log("Response sent!")
  })

  // // Needs to be un commented when migration is done
  // // Handles requests on base url
  // app.use('/', async (req, res) => 
  //   res.json({ message: "Hello from the Assetto Corssa Server Dashboard!" })
  // )

  // ****** To be added later on (This is just a template/idea) *******
  // Handles page refresh on the client side
  // (view index.hmtl and 404.html located in the client/public folder)
  // app.use((req, res) =>
    // res.sendFile(path.resolve(__dirname, '../client/public/404.html'))
  // )

  return app
}