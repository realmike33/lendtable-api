const Router = require('express').Router

// auth handlers
const signup = require('./handlers/signup')
const signin = require('./handlers/signin')

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

// CRUD routes on characters
router.route('/characters').get(getAllCharacters).post(createCharacter)
router
  .route('/characters/:id')
  .get(getCharacter)
  .put(updateCharacter)
  .delete(deleteCharacter)

module.exports = router
