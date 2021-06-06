const Character = require('../models/character')

const updateCharacter = async (req, res) => {
  const id = req.params.id
  const { stats, name } = req.body
  if (!stats || Object.keys(stats).length !== 6 || !name) {
    res.sendStatus(400)
    return
  }

  const updatedCharacter = await Character.findOneAndUpdate(
    { _id: id, createdBy: req.userId },
    { name, ...stats }
  )
    .lean()
    .exec()
  if (!updatedCharacter) {
    res.sendStatus(404)
    return
  }
  res.sendStatus(200)
}

module.exports = updateCharacter
