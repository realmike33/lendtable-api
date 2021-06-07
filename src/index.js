const Router = require('express').Router
const { authenticate } = require('./utils/jwt')
// auth handlers
const signup = require('./handlers/signup')
const signin = require('./handlers/signin')
const getUser = require('./handlers/getUser')
// character handlers
const createCharacter = require('./handlers/createCharacter')
const getCharacter = require('./handlers/getCharacter')
const deleteCharacter = require('./handlers/deleteCharacter')
const updateCharacter = require('./handlers/updateCharacter')
const getAllCharacters = require('./handlers/getAllCharacters')

const router = Router()

//Auth routes
router.post('/signup', signup)
router.post('/signin', signin)
router.get('/me', authenticate, getUser)

// CRUD routes on characters
router
  .route('/characters')
  .get(authenticate, getAllCharacters)
  .post(authenticate, createCharacter)
router
  .route('/characters/:id')
  .get(authenticate, getCharacter)
  .put(authenticate, updateCharacter)
  .delete(authenticate, deleteCharacter)

module.exports = router
