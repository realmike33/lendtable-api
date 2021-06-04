const jwt = require('jsonwebtoken')
const config = require('../../config')

const createJWT = (userId) => {
  try {
    const payload = { id: userId }
    const token = jwt.sign(payload, config.secrets.jwt, {
      expiresIn: config.jwtExp,
    })

    return token
  } catch (err) {
    return null
  }
}

const decodeJWT = (token) => {
  const payload = jwt.verify(token, config.secrets.jwt)
  return payload.id
}

module.exports = { createJWT, decodeJWT }
