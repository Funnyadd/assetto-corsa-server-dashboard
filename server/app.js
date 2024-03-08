const express = require('express')
const app = express()
const listenningPort = 3001

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "http://localhost:3000")
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, POST, GET, OPTIONS, HEAD')
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, x-requested-with, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization'
  );
  res.header('Access-Control-Expose-Headers', 'Authorization')
  next()
})

app.use('/', async (req, res) => {
  const port = req.query.port
  console.log(`Request received for port ${port}`)
  const jsonResponse = await getJson(port)
  res.json(jsonResponse)
  console.log("Response sent!")
})

app.listen(listenningPort, () => {
  console.log(`Assetto-corsa-server-backend is listening on port ${listenningPort}`)
})

const getJson = async(port) => {
  const url = `http://localhost:${port}/JSON%7C`;

  return await fetch(url)
  .then(res => res.json())
  .catch(err => {
    console.error(err)
    return { status: 404, error: "No server running at this address" }
  })
}
