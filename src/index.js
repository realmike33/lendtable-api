const Router = require('express').Router
const deleteCharacter = require('./handlers/deleteCharacter')
const createCharacter = require('./handlers/createCharacter')
const updateCharacter = require('./handlers/updateCharacter')
const getCharacter = require('./handlers/deleteCharacter')
const getAllCharacters = require('./handlers/getAllCharacters')
const signup = require('./handlers/signup')
const signin = require('./handlers/signin')
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
