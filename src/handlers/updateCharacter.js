const Character = require('../models/character')

const updateCharacter = async (req, res) => {
  const id = req.params.id
  const { stats, name, avatar } = req.body
  if (!stats || Object.keys(stats).length !== 6 || !name || !avatar) {
    res.sendStatus(400)
    return
  }

  const updatedCharacter = await Character.findOneAndUpdate(
    { _id: id, createdBy: req.userId },
    { avatar, name, ...stats }
  )
    .lean()
    .exec()
  if (!updateCharacter) {
    res.sendStatus(404)
    return
  }
  res.sendStatus(200)
}

module.exports = updateCharacter
