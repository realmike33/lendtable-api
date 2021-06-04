const Character = require('../models/character')

const getCharacter = async (req, res) => {
  const id = req.params.id
  const foundCharacter = await Character.findOne({
    _id: id,
    createdBy: req.userId,
  })
    .lean()
    .exec()
  if (!foundCharacter) {
    res.sendStatus(404)
    return
  }
  res.status(200).send({ data: foundCharacter })
}

module.exports = getCharacter
