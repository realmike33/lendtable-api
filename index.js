'use strict'
const { json, urlencoded } = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const app = require('express')()
const { port, db } = require('./config')
const apiRouter = require('./src')

app.use([morgan('tiny'), json(), urlencoded({ extended: true }), cors()])
app.use('/api', apiRouter)

const server = async () => {
  try {
    await mongoose.connect(db.url)
  } catch (e) {
    console.log('e: ', e)
  }
  app.listen(port, (err) => {
    if (err) {
      process.exit(1)
    }
    console.log(`Listening on port ${port}`)
  })
}

server()
