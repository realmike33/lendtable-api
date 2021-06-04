const Character = require('../models/character')
const deleteCharacter = async (req, res) => {
  const id = req.params.id
  const deletedCharacter = await Character.findOneAndDelete({
    _id: id,
    createdBy: req.userId,
  })
    .lean()
    .exec()
  if (!deletedCharacter) {
    res.sendStatus(404)
    return
  }
  res.sendStatus(204)
}

module.exports = deleteCharacter
