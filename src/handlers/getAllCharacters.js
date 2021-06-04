const Character = require('../models/character')

const getAllCharacters = async (req, res) => {
  const characters = await Character.find({}).lean().exec()
  res.status(200).send({ data: characters })
}

module.exports = getAllCharacters
