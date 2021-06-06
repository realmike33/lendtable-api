const Character = require('../models/character')

const getAllCharacters = async (req, res) => {
  const characters = await Character.find({})
    .sort({ updatedAt: '-1' })
    .populate('createdBy', 'userName _id')
    .lean()
    .exec()
  res.status(200).send({ data: characters })
}

module.exports = getAllCharacters
