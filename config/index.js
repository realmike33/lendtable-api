const merge = require('lodash.merge')

const env = process.env.NODE_ENV || 'development'

const base = {
  env,
  port: process.env.PORT || 4001,
  db: {
    url: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/fantasy',
  },
  jwtExp: '7d',
  secrets: {
    jwt: process.env.JWT_SECRET || 'balloons',
  },
}

let envConfig = {}

module.exports = merge({}, base, envConfig)
