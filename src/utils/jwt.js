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

const authenticate = async (req, res, next) => {
  const token = req.get('authorization') || req.query.authorization

  if (!token) {
    res.sendStatus(401)
    return
  }

  try {
    const id = decodeJWT(token)

    if (id) {
      req.userId = id
      return next()
    }

    res.sendStatus(401)
  } catch (e) {
    // expired token shouldn't 500
    if (e.name === 'TokenExpiredError') {
      res.sendStatus(401)
      return
    }
    res.sendStatus(500)
  }
}

module.exports = { createJWT, decodeJWT, authenticate }
